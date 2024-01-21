import { BsPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useCreateTeamMutation } from '../../graphql/gen-types'
import useAppParams from '../../hooks/useBoardParams'
import { WorkspaceConfig } from '../../redux/slices/workspace.slice'
import { useAppSelector } from '../../redux/store'
import { createPath } from '../../utils'

export default function TeamList() {
  const [createTeam] = useCreateTeamMutation()
  const teams = useAppSelector(state =>
    Object.values(state.workspace.blocks).filter(e => e.__typename === 'Team')
  )

  const navigate = useNavigate()

  const { teamId, groupId, messageId } = useAppParams()

  return (
    <div className='flex !w-14 flex-col items-center gap-2 border-r  p-2'>
      <div
        onClick={() =>
          navigate(
            createPath({
              teamId: WorkspaceConfig.personalTeam,
              messageId,
              groupId
            })
          )
        }
        className={`h-8 w-8 bg-slate-300 transition duration-700 hover:bg-slate-100 hover:ring-2 ${
          teamId === WorkspaceConfig.personalTeam
            ? 'rounded !bg-slate-400'
            : 'rounded-full'
        }`}
      />

      <div className='w-full border-t bg-slate-900'></div>

      <div className='relative w-full flex-1'>
        <div className='scroll-y-hidden absolute inset-0 flex-col gap-2 overflow-y-auto'>
          {teams?.map((team, index) => (
            <div
              onClick={() =>
                navigate(
                  createPath({
                    teamId: team._id,
                    messageId,
                    groupId
                  })
                )
              }
              className={`m-1 h-8 w-8 bg-slate-300 transition duration-700 hover:bg-slate-100 hover:ring-2 ${
                teamId === team._id ? 'rounded !bg-slate-400' : 'rounded-full'
              }`}
              key={index}
            />
          ))}
        </div>
      </div>

      <div
        onClick={() => {
          createTeam({
            variables: {
              teamInput: {
                title: 'New Team'
              }
            }
          })
        }}
        className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 transition hover:bg-slate-100 hover:ring-2'
      >
        <BsPlus className='text-2xl' />
      </div>
    </div>
  )
}
