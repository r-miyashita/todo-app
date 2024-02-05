import { ref } from 'vue'
import { defineStore } from 'pinia'


// viewでもタイプを使い回すので、エクスポートしておく
export type Task = {
    id: number
    title: string,
    task: string,
    sdate: string,
    edate: string,
    isDone: boolean
}

export const useTaskStore = defineStore(
    'task',
    () => {
        /* state */
        const tasks = ref<Task[]>([])
        const idCounter = ref<number>(1)

        /* getters */
        function getTargetTask(targetId: number) {
            // 返却はオブジェクトなので、配列から１つ目のみ取り出す。（id で一意検索しているので問題なし）
            return tasks.value.filter((task) => { return task.id === targetId })[0]
        }

        /* actions */
        function addTask(newTask: Task): void {
            tasks.value.push(newTask)
            incrementId()
        }
        function incrementId() {
            idCounter.value++
        }
        function updateIsDone(targetId: number): void {
            for(const task of tasks.value) {
                if(task.id===targetId) {task.isDone = true}
            }
        }
        function updateTask(targetTask: Task): void {
            const target = tasks.value.filter((task) => { return task.id === targetTask.id })[0]
            target.title = targetTask.title
            target.task = targetTask.task
            target.sdate = targetTask.sdate
            target.edate = targetTask.edate
        }
        function deleteTask(targetId: number): void {
            tasks.value = tasks.value.filter((task) => {return task.id !== targetId })
        }
        function reset() {
            tasks.value = []
            idCounter.value = 1
        }
        // return
        return { tasks,
            idCounter,
            getTargetTask,
            addTask,
            updateIsDone,
            updateTask,
            deleteTask,
            reset
        }
    },
    {
        persist: true
    }
)
