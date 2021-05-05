'use strict'
const API = 'https://raw.githubusercontent.com/Mediumgr/online-store-api/master/responses';


const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    cartUrl: "/getBasket.json",
    filtered: [],
    searchLine: '',
    basketProducts: [],
    isVisibleCart: false,
    placeholderText: 'Найти товар..',
    outputPrice: '',
    totalPrice: '',
    priceDescription: 'Итого: '
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product, event) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            event.target.innerText = 'Добавлено в корзину';
            event.target.style.background = '#a3b4c4';
            let searchProduct = this.basketProducts.find(element => element.id_product === product.id_product);
            if (searchProduct) {
              searchProduct.quantity++;
            } else {
              let productElement = Object.assign({
                quantity: 1
              }, product);
              this.basketProducts.push(productElement)
            }
          } else {
            alert('Ошибка данных корзины');
          }
          this.productsPriceShow();
        })
    },
    calcSum() {
      return this.basketProducts.reduce((accum, item) => accum + (item.price * item.quantity), 0);
    },
    productsPriceShow() {
      if (this.basketProducts.length) {
        this.outputPrice = this.calcSum();
        this.totalPrice = this.priceDescription + `${this.outputPrice}` + ' ₽';
      } else {
        this.totalPrice = 'В корзине нет товаров';
      }
    },
    removeProduct(product) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (product.quantity > 1) {
              product.quantity--;
            } else {
              this.basketProducts.splice(this.basketProducts.indexOf(product), 1)
            }
          }
          this.productsPriceShow();
        })
    },
    async filterProducts(inputData) {
      console.log(inputData);
      this.products = [];
      const regexp = new RegExp(inputData, 'i');
      await this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for (let el of data) {
            this.products.push(el);
          }
        });
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      this.products = this.filtered;
    }
  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      });
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.basketProducts.push(el);
          this.productsPriceShow();
        }
      });
  }
});