import React, { useRef } from 'react'
import { render } from 'react-dom'
import Sidebar from './Sidebar'

export default function SettingsSidebar () {
  return (
    <Sidebar title="设置">
      <div className="settings">
        <div className="setting-grp">
          <h2 className="grp-title">通用</h2>
          <div className="item">
            <div className="btn-type">
              这是一个按钮
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
