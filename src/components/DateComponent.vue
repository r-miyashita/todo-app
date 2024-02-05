<script setup lang="ts">
const now: Date = new Date()
const year: string = String(now.getFullYear())
const month: string = ('0' + String(now.getMonth() + 1)).slice(-2)
const date: string = ('0' + String(now.getDate())).slice(-2)
const weekOfDay: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const day: string = weekOfDay[now.getDay()]

</script>
<template>
    <div class="date">
        <span class="date__heading">ToDay</span>
        <span class="date__ymd">{{ year }}.{{ month }}.{{ date }}</span>
        <span class="date__weekday">{{ day }}</span>
    </div>
</template>