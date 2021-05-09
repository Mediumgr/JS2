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
    show: '',
    placeholderText: 'Найти товар',
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
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
        })
    },
    removeProduct(product) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (product.quantity > 1) {
              product.quantity--;
            } else {
              this.basketProducts.splice(product, 1)
            }
          }
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
          this.filtered.push(el);
        }
      });
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.basketProducts.push(el);
        }
      });
  }
});