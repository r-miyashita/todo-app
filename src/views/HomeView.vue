<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTaskStore } from '@/stores/useTask'
import type { Task } from '@/stores/useTask'
import ModalHandler from '@/components/ModalComponent.vue'

/* *****************************
userTaskStore から「未完了」タスクを取得しリアクティブ変数に格納。
初期状態として上記をリスト表示
@taskList

タスク単位のパラメータは以下
@id
@title
@task
@sdate
@edate
@isDone : false が未完了
***************************** */
const store = useTaskStore()
const tasks = store.tasks.filter((task) => { return !task.isDone })
const taskList = ref<Task[]>(tasks)

/* *****************************
検索機能
検索インプットの値。検索イベントで使う
@keyWord
***************************** */
const keyWord = ref<string>('')

// 検索ボタンクリックで発火。like検索結果をタスクリストにセット。
const searchTasks = () => {
    if(keyWord.value) {
    taskList.value = tasks.filter((task) => { return task.title.includes(keyWord.value)})
    }
}

// インプットのチェンジイベント。検索文字列が入っていない場合は、タスクリストの表示状態をリセットする。
const resetResult = () => {
    if(!keyWord.value || keyWord.value === '') {
    taskList.value = tasks
    }
}

/* *****************************
チェックボタンクリックイベント
ターゲットidをストアの更新イベントに渡す。
「isDone : true ： 完了」 へ変更
***************************** */
const updateStatus = (e: Event) => {
    const eVal: any = identifyClickedTask(e)
    const button: HTMLButtonElement = eVal.button
    const target: HTMLElement = eVal.target
    const targetId: number = eVal.targetId
    store.updateIsDone(targetId)

    // 「完了」したリストは取り消し線をつける。ボタンのイベントを無効にする。
    target.classList.add('done')
    button.classList.add('checked')
}

/* *****************************
削除ボタンクリックイベント
ターゲットidをストアの削除イベントに渡す
***************************** */
const deleteTasks = (e: Event) => {
    const eVal: any = identifyClickedTask(e)
    const target: HTMLElement = eVal.target
    const targetId: number = eVal.targetId
    store.deleteTask(targetId)

    // 「削除」 されたidは非表示にする
    target.classList.add('deleted')
}

/* *****************************
詳細ボタンクリックイベント

クリックされたタスクを表示情報として <Modal /> へ渡す
@targetTask

モーダルを表示させる
@modal

***************************** */
const targetTask = ref<Task>()
const identifyTask = (e: Event) => {
    // @targetTask の処理
    const targetId: number = identifyClickedTask(e).targetId
    targetTask.value = store.getTargetTask(targetId)

     // @modal の処理
    modalOpen()
}

function identifyClickedTask(e: Event) {
    const button: HTMLButtonElement = (e.target as HTMLButtonElement)
    const target: HTMLElement = button.parentElement!
    return {
    button: button as HTMLButtonElement,
    target: target as HTMLElement,
    targetId: Number(target.id.split('_')[1]) as number
    }
}

const modal = ref<boolean>(false)
function modalOpen() {
    modal.value = true
}
function modalClose() {
    modal.value =false
}

</script>

<template>
    <section class="home">
        <div class="home__container">
            <div class="optbar">
                <RouterLink to="/add" class="optbar__link">AddTask  >></RouterLink>
                <div class="searchbox">
                    <input v-model="keyWord" type="text" id="searchbox__input" class="searchbox__input"  @change="resetResult">
                    <button class="searchbox__button" @click="searchTasks">search</button>
                </div>
            </div>
            <ul class="taskList">
                <li class="taskList__item"
                    v-for="(task, index) in taskList"
                    :key="index"
                    :id="`js-taskid_${ task.id }`"
                >
                    <button class="button taskList__button check" @click="updateStatus"></button>
                    <div class="taskList__info">
                    <p class="taskList__title">{{ task.title }}</p>
                    <p class="taskList__time">〜 {{ task.edate }}</p>
                    </div>
                    <ModalHandler :task="targetTask" :modal="modal" @btn-click="identifyTask" @modal-close="modalClose" />
                    <button class="button taskList__button trash" @click="deleteTasks"></button>
                </li>
            </ul>
        </div>
    </section>
</template>
