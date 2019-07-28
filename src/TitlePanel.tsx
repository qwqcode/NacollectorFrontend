import React, { useState, Props } from 'react'
import { createContainer } from 'unstated-next'
import { render } from 'react-dom'

let CommonStore = createContainer(() => {
  let [conf, setConf] = useState({ isSidebarShow: false })

  return {
    conf,
    setSidebarDisplay: (isShow: boolean) => {
      setConf({ ...conf, isSidebarShow: isShow })
    }
  }
})

function Sidebar () {
  let common = CommonStore.useContainer()
  return (
    <div style={{ display: common.conf.isSidebarShow ? 'block' : 'none' }}>
      this is sidebar
    </div>
  )
}

function Switch () {
  let common = CommonStore.useContainer()
  return (
    <div>
      <button type="button" onClick={() => { common.setSidebarDisplay(!common.conf.isSidebarShow) }}>显示</button>
    </div>
  )
}

class TitlePanel extends React.Component<{}, {}> {
  public render (): JSX.Element {
    return (
      <CommonStore.Provider>
        <Switch></Switch>
        <Sidebar></Sidebar>
      </CommonStore.Provider>
    )
  }
}

export default TitlePanel
