import App from '../.'
import AppAction from '../AppAction'
import SettingContent from './SettingContent'
import { html } from 'common-tags'

/**
 * 设置
 */
export default class Setting {
  public init () {
    AppAction.utilsReqIeProxy() // 无参数代表同步
    let settingSidebar = App.AppLayer.Sidebar.register(this.sidebarKey)
    settingSidebar.setTitle('设置', '#0089ff')
    settingSidebar.setWidth(360)
    // Setting Content
    let settingDom = $('<div class="setting"></div>')
    let group = (name: string, title: string) => {
      return $(html`
        <div class="setting-group" data-setting-sidebar-group="${name}">
          <h2 class="setting-group-title">${title}</h2>
        </div>
      `).appendTo(settingDom)
    }
    SettingContent(this, group)
    settingSidebar.setInner(settingDom)
  }

  public get (key: string): string {
    let settingValue = JSON.parse(localStorage.getItem('setting')) || {}
    return settingValue.hasOwnProperty(key) ? settingValue[key] : null
  }

  public set (key: string, val: any): void {
    let settingValue = JSON.parse(localStorage.getItem('setting')) || {}
    settingValue[key] = val
    localStorage.setItem('setting', JSON.stringify(settingValue))
  }

  public readonly sidebarKey = 'setting'

  public getSidebar () {
    return App.AppLayer.Sidebar.get(this.sidebarKey)
  }
}
