/* const goods = [{
    title: 'Shirt',
    price: 150
},
{
    title: 'Socks',
    price: 50
},
{
    title: 'Jacket',
    price: 350
},
{
    title: 'Shoes',
    price: 250
},
];

const renderGoodsItem = (item) => {
return `<div class="product-item">
        <div class="goods-item"><h3>${item.title}</h3>
        <p>${item.price}</p>
        </div>
        <button class="buy-btn">Купить</button></div>`;
};

const renderGoods = (goods) => {
/*  let goodsList = goods.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList; */
document.querySelector('.goods-list').innerHTML = goods.map(item => renderGoodsItem(item.title, item.price).join('');
}

renderGoods(goods);*/