document.addEventListener('DOMContentLoaded', async () => {
    const { User, Cart, Product } = require('./models'); // Импортируем модели

    const cartItemsContainer = document.querySelector('.cart-items');
    const itemsTotalElement = document.getElementById('items-total');
    const promoDiscountElement = document.getElementById('promo-discount');
    const personalDiscountElement = document.getElementById('personal-discount');
    const deliveryCostElement = document.getElementById('delivery-cost');
    const finalTotalElement = document.getElementById('final-total');
    const promoCodeInput = document.getElementById('promo-code-input');
    const applyPromoBtn = document.querySelector('.apply-promo-btn');
    const selectAllCheckbox = document.getElementById('select-all');
    const removeSelectedBtn = document.querySelector('.remove-selected-btn');
    const backToShopBtn = document.querySelector('.back-to-shop-btn');

    let cart = []; // Корзина будет храниться в базе данных

    // Загрузка товаров из базы данных
    async function loadCartFromDatabase() {
        try {
            const user = await User.findOne({ where: { email: localStorage.getItem('currentUser') } });
            if (user) {
                cart = await user.getProducts(); // Получаем товары пользователя
                updateCartDisplay();
            }
        } catch (error) {
            console.error('Ошибка при загрузке корзины:', error);
        }
    }

    // Обновление отображения корзины
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let itemsTotal = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <label class="item-checkbox">
                    <input type="checkbox" data-index="${index}" class="item-select">
                    <span class="checkmark"></span>
                </label>
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-description">${item.description || ''}</div>
                </div>
                <div class="item-quantity">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <span class="item-price">${(item.price * item.quantity).toLocaleString()} ₽</span>
                <button class="item-remove" data-index="${index}">Удалить</button>
            `;
            cartItemsContainer.appendChild(listItem);
            itemsTotal += item.price * item.quantity;
        });

        updateSummary(itemsTotal);
    }

    // Обновление итогов
    function updateSummary(itemsTotal) {
        let promoDiscount = 0;
        if (promoCode === 'SUMMER20') {
            promoDiscount = itemsTotal * 0.2; // 20% discount
        }
        let finalTotal = itemsTotal - promoDiscount - personalDiscount;
        if (finalTotal < 0) finalTotal = 0;

        itemsTotalElement.textContent = `${itemsTotal.toLocaleString()} ₽`;
        promoDiscountElement.textContent = `- ${promoDiscount.toLocaleString()} ₽`;
        personalDiscountElement.textContent = `- ${personalDiscount.toLocaleString()} ₽`;
        finalTotalElement.textContent = `${finalTotal.toLocaleString()} ₽`;
    }

    // Загрузка корзины при загрузке страницы
    loadCartFromDatabase();
});