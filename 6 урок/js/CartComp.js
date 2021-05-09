Vue.component('cart', {
    data() {
        return {
            imgCart: ['photo/asus.jpg', 'photo/acer.jpg', 'photo/hp.jpg', 'photo/dell.jpg'],
            cartUrl: '/getBasket.json',
            cartItems: [],
            isVisibleCart: false,
            totalPrice: ''
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({
                                quantity: 1
                            }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                    this.productsPriceShow();
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                    this.productsPriceShow();
                })
        },
        productsPriceShow() {
            this.outputPrice = this.calcSum();
            this.totalPrice = 'Итого: ' + `${this.outputPrice}` + ' ₽';
        },
        calcSum() {
            return this.cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    this.productsPriceShow();
                }
            });
    },
    template: `
        <div class = "cart__inline_block">
            <button class="cart-button" type="button" @click="isVisibleCart =!isVisibleCart">Корзина</button>
            <div class="cart-block" v-show="isVisibleCart">
                <p v-if="!cartItems.length" style="padding-left: 55px">В корзине нет товаров</p>
                <cart-item class="cart-item" v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="imgCart[2]" @remove="remove"></cart-item>
            <h3 v-if=cartItems.length style="padding-left: 65px">{{totalPrice}}</h3>
            </div>
        </div>`
});

//'cartItem' параметр внутри компонента передает ссылку на :cart-item(выше) которая ссылается в приложение app
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div> 
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});