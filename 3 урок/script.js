'use strict'
const API = 'https://raw.githubusercontent.com/Mediumgr/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch
/* let getRequest = (url, callBack) => {
  let xhr = new XMLHttpRequest();
  //Чтобы определить, куда отправить запрос, используется метод .open():
  xhr.open('GET', url, true);
  //Чтобы поймать момент, когда ответ от сервиса получен, можно воспользоваться свойством onreadystatechange:
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        callBack(xhr.responseText);
      }
    }
  }
  xhr.send();
};  */

/* function getRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.status);
        } else {
          resolve(xhr.responseText);
        }
      }
    }
    xhr.send();
  })
}; */
///////////////////////////////////////

/**
 * Описываем базовые классы
 */
class List {
  constructor(url, container, list = listContext) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this.filtered = []; // отфильтрованные товары
    this._init();
  }

  /* подсчет стоимости всех товаров */
  calcSum() {
    const totalPrice = this.allProducts.reduce((accum, item) => accum + (item.price * item.quantity), 0);
    document.querySelector('.totalPrice').innerHTML = 'Итого: ' + `${totalPrice}` + ' ₽';
    if (totalPrice === 0) {
      document.querySelector('.totalPrice').innerHTML = 'В корзине нет товаров';
    }
  }

  /**
   * получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

  /**
   * обработка полученных данных
   * @param data
   */
  handleData(data) {
    this.goods = [...data];
    this.render();
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      console.log(this.constructor.name);
      const productObj = new this.list[this.constructor.name](product);
      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('afterbegin', productObj.render());
    }
  }

  /**
   * метод поиска товаров
   * @param value - поисковый запрос
   */
  filter(value) {
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
      const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
      if (!this.filtered.includes(el)) {
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
    })
  }
  _init() {
    return false
  }
}

class Item {
  constructor(el) {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = el.img;
  }
  render() {
    return ``;
  }
}
/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {
  constructor(cart, container = '.goods-list', url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data));
  }

  _init() {
    document.querySelector(this.container).addEventListener('click', event => {
      if (event.target.classList.contains('buy-btn')) {
        this.cart.addProduct(event.target);
        event.target.innerText = 'Добавлено в корзину';
        event.target.style.background = '#a3b4c4';
      }
    });
    document.querySelector('.search-form').addEventListener('submit', event => {
      event.preventDefault();
      this.filter(document.querySelector('.search-field').value)
    })
  }
}

class ProductItem extends Item {
  render() {
    return `<div class="product-item"  data-id="${this.id_product}">
                    <img class="products__style" src="${this.img}" alt="Some img">
                    <div class="goods-item">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} ₽</p>
                         <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
  }
}

class Cart extends List {
  constructor(container = ".cart-block", url = "/getBasket.json") {
    super(url, container);
    this.getJson()
      .then(data => {
        this.handleData(data.contents);
        this.calcSum();
      });
  }

  /**
   * добавление товара
   * @param element
   */
  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let searchProduct = this.allProducts.find(product => product.id_product === productId);
          if (searchProduct) {
            searchProduct.quantity++;
            this._updateCart(searchProduct);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1,
              img: element.parentNode.parentNode.childNodes[1].currentSrc
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.render();
            this.calcSum();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let searchProduct = this.allProducts.find(product => product.id_product === productId);
          if (searchProduct.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
            searchProduct.quantity--;
            this._updateCart(searchProduct);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(searchProduct), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
            this.calcSum();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product) {
    let exchange = ' ₽';
    let total = 0;
    let countTotalPrice;
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price}` + `${exchange}`;
    this.allProducts.forEach((element) => {
      countTotalPrice = parseInt(`${element.quantity * element.price}`);
      total += countTotalPrice;
    });
    document.querySelector('.totalPrice').innerHTML = 'Итого: ' + `${total}` + `${exchange}`;
  }
  _init() {
    document.querySelector('.cart-button').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', event => {
      if (event.target.classList.contains('del-btn')) {
        this.removeProduct(event.target);
      }
    })
  }
}

class CartItem extends Item {
  constructor(el) {
    super(el);
    this.quantity = el.quantity;
  }
  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity*this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
  }
}

const listContext = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);