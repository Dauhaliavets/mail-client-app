import { IMail } from './mail'

interface IUser {
  _id: string
  name: string
  mails: IMail[]
}

export type { IUser }
