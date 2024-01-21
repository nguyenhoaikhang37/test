import { ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import {
  WorkspaceInfoBlockUnion,
  useGetUserDataQuery,
  useWorkspaceInfoBlocksUpdatedSubscription
} from '../../graphql/gen-types'
import useRouteHandler from '../../hooks/useRouteHandler'
import {
  workspaceActions,
  WorkspaceInfoBlocks
} from '../../redux/slices/workspace.slice'
import Sidebar from '../sidebar/Sidebar'
import AppHeader from './Header'
import TeamList from './TeamList'

export default function MainLayout({ children }: { children?: ReactNode }) {
  const dispatch = useDispatch()

  useRouteHandler()
  useGetUserDataQuery({
    onCompleted(data) {
      dispatch(
        workspaceActions.init({
          loading: false,
          blocks: data.getUserData.reduce(
            (pre, next) => ({ ...pre, [next._id]: next as any }),
            {} as WorkspaceInfoBlocks
          )
        })
      )
    }
  })
  useWorkspaceInfoBlocksUpdatedSubscription({
    onData(data) {
      console.log(data)

      dispatch(
        workspaceActions.boardDatablocksUpdated(
          (data.data.data
            ?.workspaceInfoBlocksUpdated as WorkspaceInfoBlockUnion[]) || []
        )
      )
    }
  })

  return (
    <>
      <div className='flex h-screen w-screen flex-col text-sm'>
        <AppHeader />
        <div className='flex flex-1'>
          <TeamList />
          <div className='w-64'>
            <Sidebar />
          </div>
          <div className='flex flex-1 flex-col'>
            {children || (
              <div className='flex h-full w-full items-center justify-center'>
                No content
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Drawer /> */}
    </>
  )
}
