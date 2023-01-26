import { Dispatch, SetStateAction } from 'react'
import { IUser } from './user'

interface IContext {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
}
export type { IContext }
