import App from './'
import { html } from 'common-tags'
import Form from './SpiderList/Form'

/**
 * Task Generator (任务生成器)
 */
export default class TaskGen {
  public readonly sel = {
    form: '.taskgen-form',
    formToggle: '.taskgen-form-toggle',
    formToggleDropdown: '.taskgen-form-toggle .namespace-dropdown',
    formToggleBtns: '.taskgen-form-toggle .classname-btns'
  }

  public spiderList: { [key: string]: { [key: string]: { label: string, genForm?: Function } } } = {}

  // 当前
  public current: {
    typeName: string
    inputs: { [key: string]: { label: string, inputSel: string, validator?: Function } }
  } = {
    typeName: null,
    inputs: {}
  }

  private dropdownDom: JQuery
  private dropdownSelectedDom: JQuery
  private dropdownOptionDom: JQuery
  private dropdownBtnsDom: JQuery

  // 初始化
  public init () {
    // 遍历列表 生成按钮
    this.dropdownDom = $(html`
      <div class="namespace-dropdown">
        <div class="dropdown-selected"></div>
        <ul class="dropdown-option anim-fade-in"></ul>
      </div>
    `).appendTo(this.sel.formToggle)

    this.dropdownSelectedDom = this.dropdownDom.find('.dropdown-selected')
    this.dropdownOptionDom = this.dropdownDom.find('.dropdown-option')

    this.dropdownBtnsDom = $('<div class="classname-btns"></div>').appendTo(this.sel.formToggle)

    this.dropdownSelectedDom.click(() => {
      this.dropdownOptionShow()
    })
  }

  public dropdownOptionShow () {
    this.dropdownOptionDom.addClass('show')
    // 若点击其他地方
    setTimeout(() => {
      $(document).bind('click.dropdown-option', (e) => {
        if (!$(e.target).is('.dropdown-option') && !$(e.target).closest('.dropdown-option').length) {
          this.dropdownOptionHide()
        }
      })
    }, 20)
  }

  public dropdownOptionHide () {
    $(document).unbind('click.dropdown-option')
    this.dropdownOptionDom.removeClass('show')
  }

  public newSpiderType (name: string, label: string) {
    this.spiderList[name] = {
      _NamespaceInfo: {
        label: label
      }
    }
  }

  public newSpider (typeName: string, name: string, label: string, genFormFunc: Function) {
    if (!this.spiderList[typeName]) {
      throw Error('找不到该 Spider 类型：' + typeName)
    }
    this.spiderList[typeName][name] = {
      label: label,
      genForm: genFormFunc
    }
  }

  public loadSpiderList () {
    this.dropdownOptionDom.html('') // 清空 dropdown 所有项目
    for (let [namespace, eachClass] of Object.entries(this.spiderList)) {
      let li = $(`<li data-namespace="${namespace}">${eachClass._NamespaceInfo.label}</li>`)
      li.appendTo(this.dropdownOptionDom)
      // 点击 li
      li.click(() => {
        // 按钮显示
        this.dropdownBtnsDom.html('') // 删除原有的所有按钮
        for (let [classname, classInfo] of Object.entries(eachClass)) {
          if (classname.substr(0, 1) === '_') continue
          let typeName = namespace + '.' + classname
          let btn = $(`<a>${classInfo['label']}</a>`).appendTo(this.dropdownBtnsDom)
          // 恢复当前已选中的按钮
          if (!!this.current.typeName && this.current.typeName === typeName) {
            this.dropdownBtnsDom.find('a').removeClass('active')
            $(btn).addClass('active')
          }
          btn.click(() => {
            // 表单生成
            this.formLoad(typeName)
            // 按钮选中
            this.dropdownBtnsDom.find('a').removeClass('active')
            btn.addClass('active')
          })
        }
        this.dropdownSelectedDom.text(li.text())
        this.dropdownSelectedDom.attr('data-namespace', namespace)
        // 选中当前 li
        this.dropdownOptionDom.find('li').removeClass('selected')
        li.addClass('selected')
        // 取消显示 dropdown-option
        this.dropdownOptionHide()
        // 当前 li 置顶
        // li.insertBefore(dropdownOptionDom.find('li:first-child'));
      })
    }

    // 打开第一个任务生成器
    this.dropdownOptionDom.find('li:first-child').click()
    this.dropdownBtnsDom.find('a:first-child').click()
  }

  // 分析 TypeName
  public spiderListGet (typeNameStr: string) {
    let typeName = typeNameStr.split('.') || null
    if (!typeName || !typeName[0] || !typeName[1]) return null
    let namespace = typeName[0]

    let classname = typeName[1]
    if (!this.spiderList.hasOwnProperty(namespace) || !this.spiderList[namespace].hasOwnProperty(classname)) return null
    return this.spiderList[namespace][classname]
  }

  // 表单装载
  public formLoad (typeName: string) {
    // 点击操作按钮事件
    if (!this.spiderListGet(typeName)) { throw Error('this.spiderList 中没有 ' + typeName + '，无法创建表单！') }

    let spider = this.spiderListGet(typeName)
    let formDom = $(this.sel.form)

    // 清除当前表单
    formDom.html('')
    // 清除当前数据
    this.current.typeName = null
    this.current.inputs = {}

    // 装入新数据
    this.current.typeName = typeName
    // 执行表单创建
    spider.genForm(new Form())
    // 提交按钮
    let submitBtn = $(html`<div class="form-btns"><button class="submit-btn" type="submit">执行任务</button></div>`)
      .appendTo(formDom)

    submitBtn.click(() => {
      if (!this.formCheck()) { return false }

      // console.log(formDom.find(':input').serializeArray())
      App.Task.createTask(typeName, spider.label, formDom.find(':input').serializeArray())

      return false
    })
  }

  // 表单提交检验
  public formCheck () {
    let isInputAllRight = true
    for (let [i, obj] of Object.entries(this.current.inputs)) {
      if (!obj.inputSel || $(obj.inputSel).length === 0) { throw Error(`表单输入元素 ${i} 的 Selector 无效`) }

      let inputSel = obj.inputSel
      let inputDom = $(inputSel)
      let inputVal = $.trim(inputDom.val().toString())

      if (inputVal === '') {
        inputDom.focus()
        isInputAllRight = false
        return false
      }

      // 验证器
      if (!!obj.validator && !obj.validator(inputVal)) {
        inputDom.addClass('has-error').focus()
        inputDom.bind('input propertychange', (evt) => {
          if (obj.validator(
            $.trim(inputDom.val().toString())
          )) inputDom.unbind('input propertychange').removeClass('has-error')
        })
        isInputAllRight = false
        return false
      }
    }

    return isInputAllRight
  }
}
