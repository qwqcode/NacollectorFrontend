import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import './Header.scss'

export default function Header () {
  let maximize = () => {
    /* if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    } */
  }

  const tabBoxEl = useRef(null)

  let onTabBoxWheel = (e: any) => {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
    e.currentTarget.scrollLeft -= (delta * 40) // Multiplied by 40
    e.preventDefault()
  }

  useEffect(() => {
    let tabBox: HTMLElement = tabBoxEl.current
    tabBox.addEventListener('mousewheel', onTabBoxWheel, false)

    return () => {
      tabBox.removeEventListener('mousewheel', onTabBoxWheel)
    }
  })

  let minimize = () => {
    // win.minimize()
  }

  let close = () => {
    // win.close()
  }

  let tabClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    $(e.target as HTMLElement).parents('.tab').remove()
  }

  return (
    <div className="app-header">

      <div className={classNames('app-control-box', { 'blur': false })}>
        <div className="inner">
          <div className="brand">RESCOLL</div>
          <div className="controls">
            <div className="window-icon-bg" onClick={minimize}>
              <div className="window-icon window-minimize"></div>
            </div>
            <div className="window-icon-bg" onClick={maximize}>
              <div className={classNames('window-icon', {
                'window-maximize': true, // !isMaximized,
                'window-unmaximize': false // isMaximized
              })}
              ></div>
            </div>
            <div className="window-icon-bg red" onClick={close}>
              <div className="window-icon window-close"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="app-action-bar">
        <div className="tab-box" ref={tabBoxEl} onClick={(e) => tabClick(e)}>
          <div className="tab active"><div className="name">首页</div><div className="close-btn"><i className="zmdi zmdi-close"></i></div></div>
          <div className="tab"><div className="name">[结束] 商品详情页图片解析</div><div className="close-btn"><i className="zmdi zmdi-close"></i></div></div>
          <div className="tab"><div className="name">[执行中] 商品详情页视频抓取</div><div className="close-btn"><i className="zmdi zmdi-close"></i></div></div>
          <div className="tab"><div className="name">[结束] 淘宝店铺搜索卖家ID名采集</div><div className="close-btn"><i className="zmdi zmdi-close"></i></div></div>
          <div className="tab fixed"><div className="add-btn"><i className="zmdi zmdi-plus"></i></div></div>
        </div>
        <div className="btn-group">
          <span className="btn">
            <i className="zmdi zmdi-folder-outline"></i>
          </span>
          <span className="btn">
            <i className="zmdi zmdi-download"></i>
          </span>
          <span className="btn">
            <i className="zmdi zmdi-settings"></i>
          </span>
        </div>
      </div>

    </div>
  )
}
