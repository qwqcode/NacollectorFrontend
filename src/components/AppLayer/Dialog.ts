import { html } from 'common-tags'

/**
 * 内容层 对话框
 */
export default class Dialog {
  private dialogLayerEl: JQuery<HTMLElement>
  private dialogEl: JQuery<HTMLElement>

  public constructor (title: string, content: string|JQuery<HTMLElement>, yesBtn?: [string?, Function?], cancelBtn?: [string?, Function?]) {
    if ($('.dialog-layer').length !== 0) {
      $('.dialog-layer').remove()
    }

    this.dialogLayerEl = $('<div class="dialog-layer anim-fade-in" />').appendTo('body')
    let hideDialogLayer = () => {
      this.dialogLayerEl.addClass('anim-fade-out')
      setTimeout(() => {
        this.dialogLayerEl.hide()
      }, 200)
    }

    this.dialogEl = $(html`
    <div class="dialog-inner">
      <div class="dialog-title"><span class="title-text">${title}</span></div>
      <div class="dialog-content"></div>
    </div>
    `).appendTo(this.dialogLayerEl)

    this.dialogEl.find('.dialog-content').append(content)

    // 底部按钮
    let genBottomBtn = (text: string, onClickFunc: Function) => {
      let dialogBottomElem = $('.dialog-bottom')
      if (!dialogBottomElem.length) {
        dialogBottomElem = $(`<div class="dialog-bottom"></div>`).appendTo(this.dialogEl)
      }
      let btnElem = $(`<a class="dialog-btn yes-btn"></a>`)
      btnElem.text(text)
      btnElem.click(() => {
        hideDialogLayer()
        if (typeof onClickFunc === 'function') {
          onClickFunc()
        }
      })
      btnElem.appendTo(dialogBottomElem)
    }

    // 确定按钮
    if (yesBtn) {
      genBottomBtn(yesBtn[0] || '确定', yesBtn[1])
    }

    // 取消按钮
    if (cancelBtn) {
      genBottomBtn(cancelBtn[0] || '取消', cancelBtn[1])
    }

    // 右上角关闭按钮
    if (!yesBtn && !cancelBtn) {
      let closeBtn = $('<a class="right-btn close-btn"><i class="zmdi zmdi-close"></i></a>')
      closeBtn.appendTo(this.dialogEl.find('.dialog-title'))
      closeBtn.click(() => {
        hideDialogLayer()
      })
    }
  }

  public getEl () {
    return this.dialogEl
  }

  public getLayerEl () {
    return this.dialogLayerEl
  }
}
