Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: [],
            countProd2: '',
            error: 'Товары не найдены, впишите название товара согласно каталогу',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.checkFiltered;
        },
    },
    computed: {
        checkFiltered() {
            this.$root.$children[0].countProd = this.filtered.length;
            this.countProd2 = this.filtered.length;
            /*             this.$root.$children[0].message(); */
        }
    },
    /*    img() {
           return `${window?.location.origin || ''}/img/girlinred.png`;
       } */

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
            <div class="noProducts center" v-if="countProd2 === 0">{{error}}</div>
            <product v-for="item of filtered" :key="item.id_product" :img="item.img" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
            counter: 0,
        };
    },
    methods: {
        productCounter(event) {
            event.target.innerHTML = `Added ${++this.counter} pcs`;
            this.$root.$refs.cart.changeIcon();
        },
        /* Сброс подсчета counter у добавления товара после полного удаления какого-либо элемента (продукта) из корзины */
        productCounterUpdate(event) {
            event.target.innerHTML = `Added ${this.counter = 0} pcs`;
        },
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
                    <p class="price">&#36;{{product.price}}
                        <img class="product__star" src="img/star.png" alt="star">
                    </p>
                </div>
                <div @click="productCounter($event)">
                    <div href="#" class="add__cart" @click="cartAPI.addProduct(product)"><img src="img/white_bin.png" alt="buy">Add to Cart</div>
                </div>
        </div>`
});