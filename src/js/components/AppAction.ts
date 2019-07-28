import App from './'
import Notify from './AppLayer/Notify'

/**
 * functions in .cs
 */
const AppAction = Object.assign(window.AppAction || {}, {
  utilsReqIeProxy (isEnable: boolean) {
    if (isEnable === undefined) {
      isEnable = !!App.Setting.get('UtilsReqIeProxy')
    }

    App.Setting.set('UtilsReqIeProxy', isEnable)
    try {
      AppAction._utilsReqIeProxy(isEnable)
    } catch {
      console.error('AppAction._utilsReqIeProxy 调用失败')
    }
  },

  tryGetVersion (func: Function) {
    try {
      AppAction.getVersion().then(func)
    } catch {
      console.error('AppAction.getVersion 调用失败')
      func(undefined)
    }
  },

  onExitBtnClick () {
    if (!!App.AppUpdate.panel && App.AppUpdate.panel.isUpdating) {
      Notify.error(`Nacollector 正在升级中，暂时无法退出，请稍等片刻`)
      return
    }

    let downloadingTaskNum = App.Downloads.countDownloadingTask() || 0
    if (downloadingTaskNum > 0) {
      let dialog = new App.AppLayer.Dialog('退出 Nacollector', `有 ${downloadingTaskNum} 个下载任务仍在继续！是否结束下载并退出 Nacollector？`, ['确定', () => {
        AppAction.appClose()
      }], ['取消'])
    } else {
      try {
        AppAction.appClose()
      } catch {
        console.error('AppAction.appClose 调用失败')
      }
    }
  }
})

export default AppAction
