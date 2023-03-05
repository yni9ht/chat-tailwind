<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
    <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">

      <div id="content" class="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <template v-for="(item,i) in messages" :key="i">
          <MessageItem :message="item"/>
        </template>
      </div>

      <div id="action" class="flex bg-gray-300 p-4">
        <input class="flex items-center h-10 w-10/12 rounded px-3 text-sm"
               type="text"
               placeholder="Type your message…"
               v-model="message"/>
        <button class="flex items-center mx-2 px-6 h-10 w-2/12 rounded bg-sky-400" @click="sendMessages"> send</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import MessageItem from "./MessageItem.vue";

const messages = ref([])
const message = ref('')
const sendMessages = async function () {
  if (message.value === '') {
    return
  }
  messages.value.push({role: 'user', content: message.value})
  message.value = ''

  const data = {
    messages: unref(messages)
  }
  fetch("/api/chatgpt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
  ).then(async res => {
    const body = await res.json()
    messages.value.push(body)
  }).catch(err => {
    console.log('err', err)
    messages.value.push({role: 'assistant', content: "Sorry, Network Error"})
  })
}
</script>

<style scoped>

</style>