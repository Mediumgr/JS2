Vue.component('filter-el', {
    props: ['products'],
    data() {
        return {
            userSearch: '',
            placeholder: 'Search for Featured Items...',
            searchIcon: "./img/search.png",
            countProd: '',
        }
    },
    methods: {
        /*  message() {
             if (this.$root.$children[0].$el.children[1]) {
                 let childrenNode = this.$root.$children[0].$el.children[1];
                 childrenNode.parentNode.removeChild(childrenNode);
             }
             if (this.countProd !== 0) {
                 this.$root.$children[0].$el.children[0].insertAdjacentHTML('afterend', `<div class="messageFiltered">Найдено товаров: ${+this.countProd}</div>`);
             }
             if (this.countProd === 0) {
                 this.$root.$children[0].$el.children[0].insertAdjacentHTML('afterend', `<div class="messageFiltered">Товары не найдены</div>`);
             }
         }, */
    },
    template: `
    <div>
                <div class="header__left">
                    <a href="#" class="logo">
                        <img class="logo__img" src="img/logo.png" alt="logo">BRAN<span class="letter">D</span>
                    </a>
                    <form action="#" class="header__form" @submit.prevent="$root.$refs.products.filter(userSearch.trim())">
                        <details>
                            <summary class="Listed"><span>Browse</span></summary>
                            <div class="drop__browse">
                                <div>
                                    <h3 class="drop__h3">Women</h3>
                                    <ul class="drop__ul">
                                        <li><a href="#" class="drop__a">Dresses</a></li>
                                        <li><a href="#" class="drop__a">Tops</a></li>
                                        <li><a href="#" class="drop__a">Sweaters/Knits</a></li>
                                        <li><a href="#" class="drop__a">Jackets/Coats</a></li>
                                        <li><a href="#" class="drop__a">Blazers</a></li>
                                        <li><a href="#" class="drop__a">Denim</a></li>
                                        <li><a href="#" class="drop__a">Leggings/Pants</a></li>
                                        <li><a href="#" class="drop__a">Skirts/Shorts</a></li>
                                        <li><a href="#" class="drop__a">Accessories </a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="drop__h3">Men</h3>
                                    <ul class="drop__ul">
                                        <li><a href="#" class="drop__a">Tees/Tank tops</a></li>
                                        <li><a href="#" class="drop__a">Shirts/Polos</a></li>
                                        <li><a href="#" class="drop__a">Sweaters</a></li>
                                        <li><a href="#" class="drop__a">Sweatshirts/Hoodies</a></li>
                                        <li><a href="#" class="drop__a">Blazers</a></li>
                                        <li><a href="#" class="drop__a">Jackets/vests</a></li>
                                    </ul>
                                </div>
                            </div>
                        </details>
                        <input :placeholder="placeholder" type="text" v-model="userSearch" @keypress.space="$root.$refs.products.filter(userSearch.trim())">
                        <button>
                                <img :src="searchIcon" alt="search">
                        </button>
                    </form>
                </div>
                    <div class="messageFiltered" v-show="countProd > 0">Найдено товаров: {{+countProd}}</div>
                    <div class="messageFiltered" v-show="countProd === 0">Товары не найдены</div>
    </div>
    `
});