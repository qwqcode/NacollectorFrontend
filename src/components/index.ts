import _AppNavbar from './AppNavbar'
import _TaskGen from './TaskGen'
import _Task from './Task'
import _Downloads from './Downloads'
import * as _AppWidget from './AppWidget'
import _Setting from './Setting'
import _AppLayer from './AppLayer'
import _AppUpdate from './AppUpdate'
import _AppAction from './AppAction'
import _InputValidators from '../utils/InputValidators'

const App = {
  AppNavbar: new _AppNavbar(),
  TaskGen: new _TaskGen(),
  Task: new _Task(),
  Downloads: new _Downloads(),
  AppWidget: _AppWidget,
  Setting: new _Setting(),
  AppLayer: _AppLayer,
  AppUpdate: new _AppUpdate(),
  AppAction: _AppAction,
  InputValidators: _InputValidators
}

export default App

export function init () {
  window.$ = $
  window.AppNavbar = App.AppNavbar
  window.TaskGen = App.TaskGen
  window.Task = App.Task
  window.Downloads = App.Downloads
  window.AppWidget = App.AppWidget
  window.Setting = App.Setting
  window.AppLayer = App.AppLayer
  window.AppUpdate = App.AppUpdate
  window.AppAction = App.AppAction
  window.InputValidators = App.InputValidators
}
