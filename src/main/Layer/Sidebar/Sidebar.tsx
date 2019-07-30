import './Sidebar.scss'
import React from 'react'

export default function Sidebar (props: {
  title: string
  children: React.ReactElement
}) {
  return (
    <div className="sidebar">
      <div className="header">
        <div className="left">{ props.title }</div>
        <div className="right">
          <span className="close-btn"><i className="zmdi zmdi-close"></i></span>
        </div>
      </div>
      <div className="content">
        { props.children }
      </div>
    </div>
  )
}
