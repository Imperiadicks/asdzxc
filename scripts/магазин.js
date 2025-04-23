document.addEventListener('DOMContentLoaded', async () => {
    const { Product } = require('../models/Product'); // Импортируем модель товара

    const productGrid = document.querySelector('.product-grid');

    // Функция для загрузки товаров из базы данных
    async function loadProducts() {
        try {
            const products = await Product.findAll(); // Получаем все товары из БД
            if (products.length > 0) {
                displayProducts(products);
            } else {
                productGrid.innerHTML = '<p>Товаров пока нет.</p>';
            }
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
            productGrid.innerHTML = '<p>Произошла ошибка при загрузке товаров.</p>';
        }
    }

    // Функция для отображения товаров
    function displayProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image || ''}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <span class="price">${product.price.toLocaleString()} ₽</span>
                <button class="add-to-cart-btn" data-id="${product.id}">В корзину</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Обработчик для кнопок "В корзину"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Функция для добавления товара в корзину
    function addToCart(event) {
        const productId = event.target.dataset.id;
        alert(`Товар с ID ${productId} добавлен в корзину.`);
        // Здесь можно добавить логику для сохранения товара в корзину
    }

    // Загрузка товаров при загрузке страницы
    loadProducts();
});