import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import TitlePanel from './TitlePanel'

const App = (): JSX.Element => (
  <div>
    <h1>Hello, world!</h1>
    <TitlePanel></TitlePanel>
  </div>
)

export default hot(App)
