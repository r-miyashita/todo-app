<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/stores/useTask';
import type { PropType } from 'vue';
import { useTaskStore } from '@/stores/useTask';

/* *****************************
Props
@task : 親からタスク情報を受け取る
@modal : モーダル開閉の値を受け取る。 teleport 部分の表示管理をする。
***************************** */
const props = defineProps(
    {
        task: Object as PropType<Task>,
        modal: Boolean
    }
)

/* *****************************
Emits
@btnClick() : 詳細ボタンのクリックイベント。イベントターゲットの情報を親に渡す。
            親が該当タスク情報を取得してモーダル表示用のPropsに注入。
@modalClose() : キャンセルボタンが押されたら親側でモーダル変数のステータスを変更する。
***************************** */
const emit = defineEmits<{
    (e: 'btnClick', a: Event): void
    (e: 'modalClose'): void
}>()

const btnClick = (a: Event) => { emit('btnClick',a) }
const modalClose = () => { emit('modalClose') }

/* *****************************
タスク更新処理
@inputVal : 更新情報をインプットから取得。チェンジイベントで変更情報を受け取る。変更がない箇所は、propsの情報を参照する。
@updateInput() : Updateボタンのクリックイベントで発火。inputValを引数としてストアの該当タスクを更新する。更新後はモーダルを閉じる。
***************************** */
const inputVal = ref({} as Task)

const updateInput = () => {
    inputVal.value.id = props.task?.id!
    inputVal.value.title = inputVal.value.title !== undefined? inputVal.value.title : props.task?.title!
    inputVal.value.task = inputVal.value.task !== undefined? inputVal.value.task : props.task?.task!
    inputVal.value.sdate = inputVal.value.sdate !== undefined? inputVal.value.sdate : props.task?.sdate!
    inputVal.value.edate = inputVal.value.edate !== undefined? inputVal.value.edate : props.task?.edate!
    inputVal.value.isDone = props.task?.isDone!
    const store = useTaskStore()
    store.updateTask(inputVal.value)
    modalClose()
}
</script>

<template>
    <button class="button taskList__button detail" @click="btnClick"></button>
    <teleport to='body' v-if="modal">
        <div class="modal">
            <form id="taskdetail" class="form" @submit.prevent >
                <div class="form__container">
                    <div class="form__wrapper">
                        <label for="title" class="form__label">Title</label>
                        <input id="title" type="text" class="form__title"
                            :value="props.task?.title"
                            @change="inputVal.title = ($event.target as HTMLInputElement).value"
                        />
                    </div>
                    <div class="form__wrapper">
                        <label for="task" class="form__label">Detail</label>
                        <textarea id="task" rows="5" class="form__content"
                            :value="props.task?.task"
                            @change="inputVal.task = ($event.target as HTMLInputElement).value"
                        />
                    </div>
                    <div class="form__wrapper">
                        <label for="sdate" class="form__label">StartDate</label>
                        <input id="sdate" type="date" class="form__date"
                            :value="props.task?.sdate" 
                            @change="inputVal.sdate = ($event.target as HTMLInputElement).value"
                        />
                    </div>
                    <div class="form__wrapper">
                        <label for="edate" class="form__label">EndDate</label>
                        <input id="edate" type="date" class="form__date"
                            :value="props.task?.edate" 
                            @change="inputVal.edate = ($event.target as HTMLInputElement).value"
                        />
                    </div>
                    <div class="form__btnwrapper">
                        <input type="button" class="form__button submit" value="Update" @click="updateInput" />
                        <input @click="modalClose" type="button" class="form__button cancel" value="Cancel" />
                    </div>
                </div>
            </form>
        </div>
    </teleport>
</template>
