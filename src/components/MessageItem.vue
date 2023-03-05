<template>
  <div v-if="props.message.role === 'assistant' || props.message.role === 'system'"
       class="flex w-full mt-2 space-x-3 max-w-xs">
    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    <div>
      <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
        <p class="text-sm" v-html="props.message.content"></p>
      </div>
      <span class="text-xs text-gray-500 leading-none">2 min ago</span>
    </div>
  </div>
  <div v-else-if="props.message.role === 'user'" class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    <div>
      <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
        <p class="text-sm" v-html="props.message.content"></p>
      </div>
      <span class="text-xs text-gray-500 leading-none">2 min ago</span>
    </div>
    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: string,
  content: string,
}

const props = defineProps<{
  message: Message
}>()
</script>

<style scoped>

</style>