import Dialog from './Dialog'
import Notify from './Notify'
import { Sidebar } from './Sidebar'

/**
 * 内容层
 */
const AppLayer = {
  Sidebar: new Sidebar(),
  Dialog,
  Notify
}

export default AppLayer
