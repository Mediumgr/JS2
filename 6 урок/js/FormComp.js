Vue.component('search-value', {
  data() {
    return {
      userSearch: '',
      placeholderText: 'Найти товар..'
    }
  },
  template: `
            <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter" @keypress.enter.space="$root.$refs.products.filter">
                <input type="text" class="search-field" v-model="userSearch" :placeholder="placeholderText">
                <button class="btn-search" type="submit"><i class="fas fa-search"></i></button>
            </form>
    `
});