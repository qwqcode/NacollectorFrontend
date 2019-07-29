import App from '../.'
import ItemAt from './SettingItem'

export default (setting: any, group: Function) => {
  let groupDownloads = group('downloads', '下载内容')
  new ItemAt(groupDownloads).btnBlock('下载列表清空', () => {
    App.Downloads.removeDataList()
    App.AppLayer.Notify.success('下载列表已清空')
  })

  let groupNetwork = group('downloads', '网络配置')
  new ItemAt(groupNetwork).btnToggle('采集请求跟随 IE 代理配置', () => {
    App.AppAction.utilsReqIeProxy(true)
  }, () => {
    App.AppAction.utilsReqIeProxy(false)
  }).setVal(!!App.Setting.get('UtilsReqIeProxy'))

  let groupMaintenance = group('maintenance', '维护')
  new ItemAt(groupMaintenance).btnBlock('日志文件清理', () => {
    App.AppAction.logFileClear().then(() => {
      App.AppLayer.Notify.success('日志文件已清理')
    })
  })
  let updateBtn = new ItemAt(groupMaintenance).btnBlock('检查更新', () => {
    App.AppUpdate.openPanel()
    App.Setting.getSidebar().hide()
  })
  let groupAbout = group('about', '关于')
  let infoAppVersion = new ItemAt(groupAbout).infoShow('主程序版本号', '').find('.value')
  App.AppAction.tryGetVersion((version: string) => {
    infoAppVersion.text(version || '未知版本号')
  })
  new ItemAt(groupAbout).infoShow('作者', '<a href="https://github.com/qwqcode" target="_blank">qwqcode</a>')
  new ItemAt(groupAbout).infoShow('联系', '1149527164@qq.com')
  new ItemAt(groupAbout).infoShow('博客', '<a href="https://qwqaq.com" target="_blank">qwqaq.com</a>')
  new ItemAt(groupAbout).infoShow('GitHub', '<a href="https://github.com/qwqcode/Nacollector" target="_blank">qwqcode/Nacollector</a>')
  new ItemAt(groupAbout).infoShow('反馈问题', '<a href="https://github.com/qwqcode/Nacollector/issues" target="_blank">GitHub issue</a>')
  new ItemAt(groupAbout).infoShow('', '<a href="https://raw.githubusercontent.com/qwqcode/Nacollector/master/LICENSE" target="_blank">您使用 Nacollector 即视为您已阅读并同意本《Nacollector 用户使用许可协议》的约束</a>')
  new ItemAt(groupAbout).infoShow('', `<a href="https://github.com/qwqcode/Nacollector" target="_blank">Nacollector</a> Copyright (C) ${new Date().getFullYear()} <a href="https://qwqaq.com" target="_blank">qwqaq.com</a>`)
}
