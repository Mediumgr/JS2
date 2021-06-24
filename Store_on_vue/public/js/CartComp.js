const cartItem = {
    props: ['cartItem', 'img'],
    name: 'cart-item',
    template: `   <div>
                        <div class="order__first">
                            <div class="rebox__img">
                                <img :src="img" alt="your product" class="rebox__img_photo">
                            </div>
                            <div class="flex__name__product">
                                <a href="#" class="rebox__text">{{cartItem.product_name}}</a>
                                <div class="star"><img src="img/4star.jpg" alt="stars"></div>
                                <div class="price__for__order">{{cartItem.quantity}} pcs : {{cartItem.quantity*cartItem.price}}$</div>
                            </div>
                            <div class="cross" @click="$emit('remove', cartItem, $event)">
                                <i class="fas fa-times-circle cross-circle"></i>
                            </div>
                        </div>
                    </div>`
};


Vue.component('cart', {
    components: {
        cartItem
    },
    data() {
        return {
            /*       cartUrl: '/getBasket.json', */
            cartItems: [],
            showCart: false,
            totalPrice: '',

        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                    quantity: 1
                });
                find.quantity++;
            } else {
                let prod = Object.assign({
                    quantity: 1
                }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.productsPriceShow();
                            this.changeIcon();
                        }
                    });
            }
            this.productsPriceShow();
        },
        remove(item, event) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {
                        quantity: -1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                            this.productsPriceShow();
                            this.changeIcon();
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.productsPriceShow();
                            this.changeIcon();
                            /* Возвращение DOM в первоначальное состояние у products после полного удаления товара из корзины*/
                            this.$root.$refs.products.$children.forEach(function (element, index) {
                                if (element.product.product_name === item.product_name) {
                                    this.$root.$refs.products.$el.childNodes[index].parentElement.children[index].lastElementChild.childNodes[0].innerHTML = `<img src="img/white_bin.png" alt="buy">Add to Cart`;
                                    this.$root.$refs.products.$children[index].productCounterUpdate(event);
                                }
                            }, this);
                        }
                    });
            }
        },
        productsPriceShow() {
            this.totalPrice = this.calcSum();
        },
        calcSum() {
            return this.cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);
        },
        changeIcon() {
            if (this.cartProductsAmount !== 0) {
                this.$el.childNodes[0].innerHTML =
                    `<div class="bin__img" @click="showCart=!showCart"><img class="header__cart" src="./img/cart_full.png" alt="cart"></div><div class="cartAmount">${this.cartProductsAmount}</div>`;
            } else {
                this.$el.childNodes[0].innerHTML =
                    `<div class="bin__img" @click="showCart=!showCart"><img class="header__cart" src="./img/cart.jpg" alt="cart"></div>`;
            }
        },
    },
    computed: {
        cartProductsAmount() {
            return this.cartItems.reduce((accum, item) => accum + item.quantity, 0);
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    this.productsPriceShow();
                }
            });
    },
    template:
        /* `
               <div>
                   <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                   <div class="cart-block" v-show="showCart">
                      <p v-if="!cartItems.length" style="padding-left: 55px">В корзине нет товаров</p>
                       <cart-item class="cart-item" v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="imgCart" @remove="remove"></cart-item>
                    <h3 v-if=cartItems.length style="padding-left: 65px">{{totalPrice}}</h3>
                   </div>
               </div>` */

        `     <div class="bin__for__order">
                    <div class="bin__img" @click="showCart=!showCart">
                        <img class="header__cart" src="img/cart.png" alt="cart">
                    </div>
                    <div class="product__order" v-show="showCart">
                        <p v-if="!cartItems.length" class="cartItem">В корзине нет товаров</p>
                        <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="item.img" @remove="remove">
                        </cart-item>
                        <div class="your__total__amount" v-if="cartItems.length">
                                <div class="styleForTotal">
                           Total
                                </div>
                               <div class="dollars"> 
                                    &#36;{{totalPrice}}
                               </div>
                        </div>
                        <form action="#" class="checkout__go" v-if="cartItems.length">
                            <div class="flex__button__checkout">
                                <input type="submit" value="CHECKOUT" class="styleForCheckout">
                            </div>
                            <form action="./second__page.html" class="flex__button__card">
                                <input type="submit" value="GO TO CART" class="styleForCard">
                            </form>
                        </form>                                           
                    </div>
              </div>`
});


/* Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: */
/*  `
            <div class="cart-item">
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
    ` */

/*        `   <div>
                        <div class="order__first">
                            <div class="rebox__img">
                                <img :src="img" alt="your product" class="rebox__img_photo">
                            </div>
                            <div class="flex__name__product">
                                <a href="#" class="rebox__text">{{cartItem.product_name}}</a>
                                <div class="star"><img src="img/4star.jpg" alt="stars"></div>
                                <div class="price__for__order">{{cartItem.quantity}} X {{cartItem.quantity*cartItem.price}}$</div>
                            </div>
                            <div class="cross" @click="$emit('remove', cartItem)">
                                <i class="fas fa-times-circle cross-circle"></i>
                            </div>
                        </div>
                        
            </div>`
}); */