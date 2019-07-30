import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import Header from './main/Header'

const App = () => (
  <div className="app">
    <Header></Header>
    <div className="app-wrap">
    </div>
  </div>
)

export default hot(App)
