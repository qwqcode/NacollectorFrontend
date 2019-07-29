import App from '../.'
import { html } from 'common-tags'

export default class TaskManagerLayer {
  public init () {
    let taskManager = App.AppLayer.Sidebar.register('taskManager')
    taskManager.setTitle('任务列表', '#4265c7')
    taskManager.setWidth(450)
    taskManager.setInner('<div class="task-manager"></div>')
  }

  public getItemSel (taskId: string) {
    return '[data-taskmanager-taskid="' + taskId + '"]'
  }

  public addItem (taskId: string) {
    if (!App.Task.get(taskId)) { throw Error('未找到此任务 ' + taskId) }

    let task = App.Task.get(taskId)
    let taskItem = $(html`
      <div class="task-item" data-taskmanager-taskid="${taskId}">
        <div class="left">
          <i class="zmdi zmdi-view-carousel" data-toggle="task-show"></i>
        </div>
        <div class="right">
          <h2 class="task-title" data-toggle="task-show">${task.getClassLabel()}</h2>
          <p class="task-desc"><span class="task-id">任务ID：${taskId}</span></p>
          <div class="action-bar">
            <a class="action-btn" data-toggle="task-show"><i class="zmdi zmdi-layers"></i> 显示</a>
            <a class="action-btn" data-toggle="task-remove"><i class="zmdi zmdi-close"></i> 删除</a>
          </div>
        </div>
      </div>`)
    taskItem.find('[data-toggle="task-show"]').click(() => {
      App.Task.show(taskId)
    })
    taskItem.find('[data-toggle="task-remove"]').click(() => {
      App.Task.get(taskId).remove()
    })
    taskItem.prependTo(this.getLayer().getElem().find('.task-manager'))
  }

  public removeItem (taskId: string) {
    if ($(this.getItemSel(taskId)).length === 0) { throw Error(`未找到此任务 ${taskId}`) }

    setTimeout(() => {
      // console.log(this.getItemSel(taskId))
      $(this.getItemSel(taskId)).remove()
    }, 20)
  }

  public toggleLayer () {
    this.getLayer().toggle()
  }

  public getLayer () {
    return App.AppLayer.Sidebar.get('taskManager')
  }
}
