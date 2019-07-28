import React from 'react'

export default function TabBar () {
  return (
    <div className="app-action-bar">
      <div className="info"></div>
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
  )
}
