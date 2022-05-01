<template>
  <div class="flex flex-row justify-start">
    <div class="w-full xl:w-10/12 border-gray-300 text-gray-600 bg-white shadow mt-4 p-4 text-xl">
      <span v-if="rate > 55" class="text-green-500">
        <svg class="h-7 w-7 -mt-1 inline "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
        {{ rate }}% 
        <span class="text-gray-600">Opinia użytkowników</span>
      </span>
      <span v-else-if="rate < 45" class="text-red-500">
        <svg class="h-7 w-7 -mt-1 inline "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" /></svg>
        {{ rate }}% 
        <span class="text-gray-600">Opinia użytkowników</span>
      </span>
      <span v-else-if="rate > 45 && rate < 55">
        <svg class="h-7 w-7 -mt-1 inline text-gray-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <line x1="9" y1="15" x2="15" y2="15" /></svg>
        {{ rate }}% 
        <span class="text-gray-600">Opinia użytkowników</span>
      </span>
      <span v-else>
        <svg class="h-7 w-7 -mt-1 inline text-gray-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <line x1="9" y1="15" x2="15" y2="15" /></svg>
        {{ rate }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: [Number, String]
    }
  },
}
</script>