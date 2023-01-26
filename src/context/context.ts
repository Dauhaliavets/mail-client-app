import { createContext } from 'react'
import { IContext } from '../models/contextModel'

const Context = createContext<IContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
})

export { Context }
