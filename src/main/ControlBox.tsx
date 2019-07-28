import React from 'react'
import classNames from 'classnames'

export default function ControlBox () {
  let maximize = () => {
    /* if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    } */
  }

  let minimize = () => {
    // win.minimize()
  }

  let close = () => {
    // win.close()
  }

  return (
    <div className={classNames('control-box', { 'blur': false })}>
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
  )
}
