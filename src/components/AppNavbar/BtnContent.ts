import App from '../.'

export default () => {
  // 导航栏操作按钮
  App.AppNavbar.BtnBox.groupAdd('main-btns', {
    taskManager: {
      icon: 'assignment',
      title: '任务列表',
      onClick () {
        App.Task.taskManagerLayer.toggleLayer()
      }
    },
    downloadManager: {
      icon: 'download',
      title: '下载列表'
    },
    setting: {
      icon: 'settings',
      title: '设置',
      onClick () {
        App.Setting.getSidebar().toggle()
      }
    }
  })

  App.AppNavbar.BtnBox.groupAdd('task-runtime', {
    backToTaskGen: {
      icon: 'chevron-left',
      title: '返回任务生成器',
      onClick () {
        App.Task.hide()
      }
    },
    removeTask: {
      icon: 'close',
      title: '删除任务',
      onClick () {
        App.Task.getCurrent().remove()
      }
    },
    showTaskInfo: {
      icon: 'info',
      title: '任务详情',
      onClick () {
        if (!App.Task.getCurrent()) { return }

        App.Task.getCurrent().showInfo()
      }
    }
  }).setMostLeft().hide()
}
