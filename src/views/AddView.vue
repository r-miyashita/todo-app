<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/useTask'
import type { Task } from '@/stores/useTask'
import { RouterLink } from 'vue-router'


/* *****************************
日付インプットの初期値を作成
@startDate: DOMから日付の文字列を取得し、初期値セット用にデータを加工
***************************** */
const toDay: any = document.querySelector('.date__ymd')!.textContent
const startDate: string = `${toDay.slice(0,4)}-${toDay.slice(5,7)}-${toDay.slice(8)}`

/* *****************************
@inputs {}
型定義： Task

id はuseTaskStoreのidを読み込んでセット
それ以外は inputデータからセット
@id
@title
@task
@sdate : 初期値設定あり
@edate : 初期値設定あり
***************************** */
const inputs = ref({
    sdate: startDate,
    edate: startDate
} as Task)

/* *****************************
@idCounter : ref<number>

登録イベント内で上記を参照しidをセットする
***************************** */
const store = useTaskStore()
const { idCounter } = storeToRefs(store)

/* *****************************
フォーム登録イベント
userTaskStore へデータを登録する
***************************** */
const addTask = (): void => {
    const newTask: Task = {
        id: idCounter.value,
        title: inputs.value.title,
        task: inputs.value.task,
        sdate: inputs.value.sdate,
        edate: inputs.value.edate,
        isDone: false
    }
    store.addTask(newTask)
    inputClear()
    window.alert('Added！！')
}

//フォーム入力直後にインプット欄を空にするための処理
const inputClear = (): void => {
    inputs.value.title = ''
    inputs.value.task = ''
    inputs.value.sdate = startDate
    inputs.value.edate = startDate
}

/* *****************************
ストアリセット用イベント
userTaskStore および useCounterStore のstateを初期化する。
開発用のため、本番では使わない。
***************************** */
const resetStore = ():void => {
    store.reset()
}
</script>

<template>
    <section class="add">
        <div class="add__container">
            <button @click="resetStore"></button>
            <!-- <AddTask /> -->
            <form id="newtask" class="form add__form" @submit.prevent >
                <div class="form__container">
                    <div class="form__wrapper">
                        <label for="ntsk-title" class="form__label">Title</label>
                        <input id="ntsk-title" type="text" class="form__title" v-model="inputs.title" />
                    </div>
                    <div class="form__wrapper">
                        <label for="ntsk-task" class="form__label">Detail</label>
                        <textarea id="ntsk-task" rows="5" class="form__content" v-model="inputs.task" />
                    </div>
                    <div class="form__wrapper">
                        <label for="ntsk-sdate" class="form__label">StartDate</label>
                        <input id="ntsk-sdate" type="date" class="form__date" v-model="inputs.sdate" />
                    </div>
                    <div class="form__wrapper">
                        <label for="ntsk-edate" class="form__label">EndDate</label>
                        <input id="ntsk-edate" type="date" class="form__date" v-model="inputs.edate" />
                    </div>
                    <div class="form__btnwrapper">
                        <input type="button" class="form__button submit" value="Add" @click="addTask"/>
                        <router-link to="/" type="button" class="form__button cancel" >Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>
