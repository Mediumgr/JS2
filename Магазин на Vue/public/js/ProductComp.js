Vue.component('products', {
    data() {
        return {
            /*   catalogUrl: '', */
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    /*     computed: {
            img() {
                return `${window?.location.origin || ''}/img/girlinred.png`;
            }
        }, */
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        console.log(this.img);
    },
    template: `
        <div class="products center">
            <product v-for="item of filtered" :key="item.id_product" :img="item.img" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template:
        /*  `
            <div class="product-item">
                        <img :src="img" alt="Some img">
                        <div class="desc">
                            <h3>{{product.product_name}}</h3>
                            <p>{{product.price}}₽</p>
                            <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
        <!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
        <!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                        </div>
                    </div>
            ` */

        `<div class="product-item">
                <div href="#"><img class="product-item__img" :src="img" alt="photo"></div>
                <div class="bottom">
                    <a href="#" class="text__mango">{{product.product_name}}</a>
                    <p class="price">&#36;{{product.price}}</p>
                </div>
                <div @click="cartAPI.computedQuantity(product.id_product,$event)">
                    <div href="#" class="add__cart" @click="cartAPI.addProduct(product)"><img src="img/white_bin.png" alt="buy">Add to Cart</div>
                </div>
        </div>`
});