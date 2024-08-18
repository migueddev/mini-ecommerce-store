import '../css/style.css';

const urlStore = 'https://api.fakestorejson.com/api/v1/public';

class Product {
  constructor(id, title, price, discountedPrice, image, discount) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.discountedPrice = discountedPrice;
    this.image = image;
    this.discount = discount;
    this.currencySymbol = '$';
  }

  renderProduct() {
    const template = document.getElementById('card-product-template');
    const card = template.content.cloneNode(true);

    card.querySelector('.card-product').dataset.id = this.id;
    card.querySelector('.card-product__image').src = this.image;
    card.querySelector('.card-product__title').textContent = this.title;
    card.querySelector('.card-product__discount-tag').textContent = this.discount + '%';

    const priceElement = card.querySelector('.card-product__price');
    const discountedPriceElement = card.querySelector('.card-product__price--discounted');
    const currentPriceElement = card.querySelector('.card-product__price--current');

    discountedPriceElement.textContent = this.currencySymbol + this.discountedPrice.toFixed(2);
    currentPriceElement.textContent = this.currencySymbol + this.price.toFixed(2);

    if (this.price === this.discountedPrice) {
      priceElement.removeChild(discountedPriceElement);
    }

    return card;
  }
}

class Cart {
  constructor() {
    this.items = [];
    this.subtotal = 0;
    this.totalDiscount = 0;
    this.totalPrice = 0;
    this.currencySymbol = '$';
  }
  addItem(product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({product, quantity: 1});
    }
    this.updateTotals();
    this.renderCartItems();
  }
  updateTotals() {
    this.subtotal = 0;
    this.totalDiscount = 0;
    this.totalPrice = 0;

    this.items.forEach(item => {
      const productTotal = item.product.price * item.quantity;
      const productDiscountedTotal = item.product.discountedPrice * item.quantity || productTotal;
      this.subtotal += productTotal;
      this.totalDiscount += productTotal - productDiscountedTotal;
      this.totalPrice += productDiscountedTotal;
    });

    this.renderTotals();
  }
  renderTotals() {
    document.querySelector('.minicart__total-subtotal').textContent = this.currencySymbol + this.subtotal.toFixed(2);
    document.querySelector('.minicart__total-discount').textContent = this.currencySymbol + this.totalDiscount.toFixed(2);
    document.querySelector('.minicart__total-price').textContent = this.currencySymbol + this.totalPrice.toFixed(2);
  }
  renderCartItems() {
    const itemsContainer = document.querySelector('.minicart__items-container');
    itemsContainer.innerHTML = '';
    this.items.forEach(item => {
      const template = document.getElementById('minicart-item-template');
      const card = template.content.cloneNode(true);

      card.querySelector('.minicart__item').dataset.id = item.product.id;
      card.querySelector('.minicart__item-title').textContent = item.product.title;
      card.querySelector('.minicart__item-image').src = item.product.image;
      card.querySelector('.minicart__item-quantity-number').value = item.quantity;
      itemsContainer.appendChild(card);
    });
    this.addCartEventListeners();
  }
  addCartEventListeners() {
    document.querySelectorAll('.minicart__item-quantity-button--decrease').forEach(button => {
      button.addEventListener('click', event => {
        const productId = Number(event.target.closest('.minicart__item').dataset.id).valueOf();

        this.updateItemQuantity(productId, this.getItemQuantity(productId) - 1);
        this.renderCartItems();
      });
    });

    document.querySelectorAll('.minicart__item-quantity-button--increase').forEach(button => {
      button.addEventListener('click', event => {
        const productId = Number(event.target.closest('.minicart__item').dataset.id).valueOf();
        this.updateItemQuantity(productId, this.getItemQuantity(productId) + 1);
        this.renderCartItems();
      });
    });

    document.querySelectorAll('.minicart__item-remove').forEach(button => {
      button.addEventListener('click', event => {
        const productId = Number(event.target.closest('.minicart__item').dataset.id).valueOf();
        this.removeItem(productId);
        this.renderCartItems();
      });
    });

    document.querySelectorAll('.minicart__item-quantity-number').forEach(input => {
      input.addEventListener('change', event => {
        const productId = Number(event.target.closest('.minicart__item').dataset.id).valueOf();
        this.updateItemQuantity(productId, parseInt(event.target.value, 10));
        this.renderCartItems();
      });
    });
  }
  getItemQuantity(productId) {
    const item = this.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
  updateItemQuantity(productId, quantity) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      }
    }
    this.updateTotals();
  }
  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.updateTotals();
  }
}

async function fetchProducts() {
  try {
    const cart = new Cart();

    const response = await fetch(urlStore + '/products?per_page=10&page=1');
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const productList = await response.json();
    const products = productList.data;
    const productContainer = document.querySelector('.card-product-container');

    products.forEach(product => {
      const productObject = new Product(
        product.id,
        product.name,
        Number(product.initial_price),
        Number(product.price),
        product.avatar.replace('http://localhost:8801/', 'https://api.fakestorejson.com/'),
        Number(product.discount)
      );

      const productElement = productObject.renderProduct();
      productElement.querySelector('.card-product__button').addEventListener('click', e => {
        e.preventDefault();
        cart.addItem(productObject);
      });
      productContainer.appendChild(productElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
