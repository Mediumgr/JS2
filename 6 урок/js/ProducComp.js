Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: ['photo/asus.jpg', 'photo/acer.jpg', 'photo/hp.jpg', 'photo/dell.jpg']
        }
    },
    methods: {
        filter() {
            console.log('filter');
            let regexp = new RegExp(this.$parent.$refs.searchValue.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
            <div class="products center">
                <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog[2]" :product="item"></product>
            </div>
            `
});

/* <!-- или так: <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>--> */
Vue.component('product', {
    props: ['product', 'img'],
    template: ` 
             <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="goods-item">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});