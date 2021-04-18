class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.id = product.id;
    }
    renderProduct() {
        return `<div class="product-item">
                <img class="products__style" src="${this.img}">
                <div class="goods-item"><h3>${this.title}</h3>
                <p>${this.price}</p>
                </div>
                <button class="buy-btn">Купить</button></div>`;
    }
}

class ProductsList {
    allProducts;
    goods;

    constructor() {
        this.goods = [];
        this.allProducts = [];
        this.fetchGoods();
        this.render();
        this.totalPrice();
        this.getTotalWithDiscount(0.5);
    }
    fetchGoods() {
        this.goods = [{
                title: 'Asus',
                price: 15000,
                img: 'photo/asus.jpg',
                id: 'asus'
            },
            {
                title: 'Acer',
                price: 21000,
                img: 'photo/acer.jpg',
                id: 'acer'
            },
            {
                title: 'HP',
                price: 18000,
                img: 'photo/hp.jpg',
                id: 'hp'
            },
            {
                title: 'Dell',
                price: 20000,
                img: 'photo/dell.jpg',
                id: 'dell'
            },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(product => {
            const goodItem = new ProductItem(product);
            listHtml += goodItem.renderProduct();
            this.allProducts.push(goodItem);
        });
        return document.querySelector('.goods-list').innerHTML = listHtml;
    }
    totalPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            totalPrice += good.price;
        });
        return document.querySelector('.price').insertAdjacentHTML("beforeend", 'Общая стоимость всех товаров: ' + `${totalPrice} <br/>`);
    }
    getTotalWithDiscount(discount) {
        let discountPrice = 0;
        let commonPrice = 0;
        this.goods.forEach(good => {
            commonPrice += good.price;
        });
        discountPrice = commonPrice * discount;
        return document.querySelector('.price').insertAdjacentHTML("beforeend", 'Сумма скидок по всем товарам: ' + `${discountPrice}`);
    }
}

const list = new ProductsList();

class Basket {
    constructor() {
        this.items = [];
        this.render();
    }
    render() {

    }
    add() {

    }
    remove() {

    }
}