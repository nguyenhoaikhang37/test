import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { AuthService } from '../auth/auth.service'
import { BoardService } from '../board/board.service'
import { WorkspaceInfoBlock } from '../common'
import { MessageReferenceType } from '../messageReference/messageReference.schema'
import { MessageReferenceService } from '../messageReference/messageReference.service'
import { TeamService } from '../team/team.service'
import { User } from './schemas/user.schema'
import { CreateUserInput, LoginUserInput, UpdateUserInput } from './user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly messageReference: MessageReferenceService,
    private readonly teamService: TeamService,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService
  ) {}

  async create(createUserInput: CreateUserInput) {
    const saltOrRounds = 10
    const password = createUserInput.password
    createUserInput.password = await bcrypt.hash(password, saltOrRounds)
    const user = new this.userModel(createUserInput)
    return user.save()
  }

  async findByUsersId(usersId: string[]): Promise<User[]> {
    return await this.userModel
      .find({
        _id: { $in: usersId }
      })
      .lean()
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).lean()
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserInput },
      { new: true }
    )

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`)
    }
    return existingUser
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email })
    if (!user) {
      throw new NotFoundException(`User ${email} not found`)
    }
    return user
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password
    )
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`)
    } else {
      const access_token = await this.authService.generateUserCredentials(user)
      return {
        access_token,
        ...user
      }
    }
  }

  async getUserData(userId: string) {
    const teams = await this.teamService.findTeamsByUserId(userId)

    const messRefs =
      await this.messageReference.findMessageReferenceByTeamsIdOrUserId({
        teamsId: teams.map(e => e._id),
        userId
      })

    const boards = await this.boardService.getBoardsByUserId({ userId })

    const data: WorkspaceInfoBlock[] = [
      ...teams.map(e => this.teamService.fortmatToWorkspaceBlock(e)),
      ...messRefs
        .filter(
          messRef =>
            !(
              !messRef.isPublic &&
              messRef.messageReferenceType === MessageReferenceType.Channel &&
              !messRef.members.some(m => m.userId == userId)
            )
        )
        .map(e => this.messageReference.fortmatToWorkspaceBlock(e)),
      ...boards.map(e => this.boardService.formatToWorkspaceBlock(e))
    ]

    return data
  }
}
