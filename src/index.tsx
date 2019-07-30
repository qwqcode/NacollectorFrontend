/**
 * Created by qwqcode on 2017/7/15.
 * https://github.com/qwqcode/Nacollector
 */

import './css/style.scss'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'
import './lib/outclick.min.js'
import './lib/tooltip.js'

import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App />, document.getElementById('root'))

$(document).ready(() => {
  setTimeout((): void => {
    $('body').css('opacity', '1')
  }, 10)
})
