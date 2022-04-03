<template>
  <div id="FAQ">
    <div class="bg-white py-8 shadow mt-10">
      <div class="h-48 w-full md:h-52 2xl:h-60 flex flex-col items-center justify-center shadow-md banner-background p-8 sm:py-10 md:py-12 lg:py-16 sm:px-20 md:px-32 xl:px-44 2xl:px-60">
        <h1 class="text-3xl sm:text-4xl font-semibold text-white mb-5">Masz jakieś pytanie?</h1>
        <div class="flex items-center w-3/4 px-5 py-2 bg-white shadow-sm">
          <input
            class="search-input w-full"
            placeholder="wyszukaj"
            type="text" name="inputHandler"
            @keypress="makeSureKeyIsEnter($event)"
            v-model="searchingQuery" >
          <button
            class="text-green-600 focus:outline-none"
            @click="this.searchQuestions()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <main class="flex flex-col mt-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <div v-show="this.questionsAndAnswers.length === 0" class="text-gray-400 text-xl sm:text-2xl 2xl:mt-10 mx-10 sm:mx-auto">
        <h1 class="text-8xl mb-5">:(</h1>
        <h2 class="mb-3 sm:mb-2">
          Nie znaleźliśmy odpowiedzi na zapytanie <span class="font-semibold">"{{ this.noQuestionsFoundText }}"</span>.
        </h2>
        <h2>Sprawdź poprawność wyszukiwanej frazy, lub użyj bardziej ogólnego zapytania.</h2>
        <h2>Jeżeli żaden z powyższych sposobów nie działa, spróbuj ręcznie znaleźć odpowiednie pytanie.</h2>
      </div>
      <div
        v-for="questionAndAnswer in questionsAndAnswers"
        :key="questionAndAnswer.question"
        class="w-4/5 xl:w-4/6 my-3 mx-auto shadow"
      >
        <Disclosure v-slot="{ open }">
          <DisclosureButton class="flex items-center justify-between w-full text-white px-4 py-3 bg-green-600 hover:bg-green-700 focus:outline-none">
            <span class="text-2xl md:text-3xl font-medium text-left">{{ questionAndAnswer.question }}</span>
            <div class="ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" :class="open ? 'transform rotate-180' : ''" class="transition duration-100 h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </DisclosureButton>
          <DisclosurePanel class="bg-white text-xl md:text-2xl text-gray-500 p-4">
            {{ questionAndAnswer.answer }}
          </DisclosurePanel>
        </Disclosure>
      </div>
    </main>
  </div>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import questionsAndAnswers from '../jsons files/questionsAndAnswers'

export default {
  data() {
    return {
      questionsAndAnswers: questionsAndAnswers,
      searchingQuery: '',
      noQuestionsFoundText: '',
    }
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  methods: {
    searchQuestions () {
      this.noQuestionsFoundText = this.searchingQuery;
      this.questionsAndAnswers = questionsAndAnswers
      if(this.searchingQuery.replace(/\s+/g, ' ').trim() === '') {
        return true
      }
      else {
        this.questionsAndAnswers = this.questionsAndAnswers.filter((question) => {
          let searchingQuery = this.searchingQuery.toLowerCase().split(" ")
          let questionTitle = question.question.slice(0, -1).toLowerCase()

          return searchingQuery.every(searchingWord => questionTitle.includes(searchingWord));
        })
      }
    },
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.searchQuestions()
      }
    }
  },
}
</script>