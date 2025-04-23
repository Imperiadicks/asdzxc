document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    //  Код для аккаунта (без изменений)
    // ==========================================================================
    const accountButton = document.getElementById('account-button');
    const accountModal = document.getElementById('account-modal');
    const closeButton = document.querySelector('.close-button');
    const logoutLink = document.getElementById('logoutLink');
    const avatarImg = document.querySelector('.user-avatar');
    const modalAvatarImg = document.querySelector('.modal-avatar');
    const loginLinkLi = document.getElementById('login-link-li');
    const loginLink = document.getElementById('login-link');
    const logoutLinkLi = document.getElementById('logout-link-li');
    const siteNavigation = document.querySelector('.site-navigation');
    const defaultAvatarURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo59j3Jy3Gq0jEw_RBTq1XwDk-H3H_V28G7h0t5nZ8i1G-W1Qz-nQ4rYh0U5z0k9_oA&usqp=CAU';

    // Функция для открытия модального окна аккаунта
    function openAccountModal() {
        accountModal.style.display = 'block';
    }

    // Функция для закрытия модального окна аккаунта
    function closeAccountModal() {
        accountModal.style.display = 'none';
    }

    // Функция для выхода из аккаунта
    function logout() {
        localStorage.removeItem('user');
        updateAccountView();
        closeAccountModal();  // Закрываем модальное окно при выходе
    }

    // Функция для обновления видимости элементов аккаунта
    function updateAccountView() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
             //Если пользователь авторизован
            loginLinkLi.style.display = 'none';  //Скрыть li c login
            logoutLinkLi.style.display = 'list-item';

           logoutLink.addEventListener('click', (event) => {
                event.preventDefault(); // Отменяем действие ссылки
                logout(); // Вызываем функцию выхода
             });

             //Отображение аватарки
              if (document.getElementById('account-button')) { //Проверка наличия
                 document.getElementById('account-button').remove(); //Удаляем account button
             }

            // Создаём li с account button
            const avatarLi = document.createElement('li');
            avatarLi.classList.add('nav-item');
            let avatarSource = user.avatar ? user.avatar : defaultAvatarURL; //Если есть значение в юзер, то подставляем, если нет, то дефолтную
            avatarLi.innerHTML = `<button id="account-button">
                                    <img src="" alt="Ваш аватар" class="user-avatar">
                                  </button>`;

            siteNavigation.querySelector('.nav-list').appendChild(avatarLi); // Добавляем в конец

             //Проверка наличия
             if(document.getElementById('account-button')) {
                const accountButton = document.getElementById('account-button'); // находим после создания
                accountButton.addEventListener('click', openAccountModal); // Привязка show modal
            }

            //Проверка наличия
            if(modalAvatarImg) {
                modalAvatarImg.src = user.avatar ? user.avatar : defaultAvatarURL;
            }

        } else {
             // Если пользователь не авторизован
             loginLinkLi.style.display = 'list-item';  //Показываем li c login
             logoutLinkLi.style.display = 'none';

             //Если это уже было добавлено - нужно удалить, чтобы не дублировалось
            if(document.getElementById('account-button')) {
                document.getElementById('account-button').remove();   //Удаляем account button
             }
         }
    }

    // Назначение обработчиков событий
    if (closeButton) {
        closeButton.addEventListener('click', closeAccountModal);
    }

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target == accountModal) {
            closeAccountModal();
        }
         if (event.target == logoutLink) {
            closeAccountModal();
        }
    });

    // Инициализация видимости при загрузке страницы
    updateAccountView();

    // ==========================================================================
    //  Код для слайдера новинок (без изменений)
    // ==========================================================================
    new Splide('#new-arrivals-slider', {
        type: 'loop',
        perPage: 3,
        gap: '2rem',
        breakpoints: {
            991: {
                perPage: 2,
            },
            767: {
                perPage: 1,
            },
        }
    }).mount();

    // ==========================================================================
    //  Код для категорий автомобилей (объединенный)
    // ==========================================================================
    const categoryItems = document.querySelectorAll('.category-item');
    const featuredImage = document.querySelector('.featured-image');
    const categoryLink = document.querySelector('.featured-description-wrapper .category-link');
    const featuredDescription = document.getElementById('featured-description');

    const backgroundImageMapping = {
        sedan: "https://pilot23.ru/templates/pilot23/resource/img/inomarka.png",
        suv: "URL_ВАШЕГО_ИЗОБРАЖЕНИЯ_ДЛЯ_ВНЕДОРОЖНИКОВ",
        sportcar: "URL_ВАШЕГО_ИЗОБРАЖЕНИЯ_ДЛЯ_СПОРТКАРОВ",
        truck: "URL_ВАШЕГО_ИЗОБРАЖЕНИЯ_ДЛЯ_ПИКАПОВ"
    };

    const categoryShopLinks = {
        sedan: "/shop/sedans",
        suv: "/shop/suvs",
        sportcar: "/shop/sportscars",
        truck: "/shop/trucks"
    };

    const categoryDescriptions = {
        sedan: "Седаны - это классический выбор для комфортных поездок по городу и дальних путешествий. Они сочетают в себе элегантный дизайн, экономичность и просторный салон.",
        suv: "Внедорожники предлагают высокую посадку, отличную проходимость и вместительный багажник. Идеальны для активного отдыха и сложных дорожных условий.",
        sportcar: "Спорткары созданы для тех, кто ценит скорость, динамику и захватывающие ощущения за рулем. Они обладают мощными двигателями, отличной управляемостью и ярким дизайном.",
        truck: "Пикапы - это надежные и функциональные автомобили для работы и отдыха. Они обладают высокой грузоподъемностью, прочной конструкцией и отличной проходимостью."
    };

    function setBackgroundImage(category) {
        if (backgroundImageMapping.hasOwnProperty(category)) {
            featuredImage.src = backgroundImageMapping[category];
        } else {
            featuredImage.src = "";
            console.warn(`No background image defined for category: ${category}`);
        }
    }

    function setCategoryDescription(category) {
        if (categoryDescriptions.hasOwnProperty(category)) {
            featuredDescription.textContent = categoryDescriptions[category];
        } else {
            featuredDescription.textContent = 'Описание для данной категории отсутствует.';
        }
    }

    function resetActiveState() {
        categoryItems.forEach(item => item.classList.remove('active'));
    }

    let currentCategoryIndex = 0; // Текущий индекс категории
    let timerInterval; // Переменная для хранения ID интервала

    function showNextCategory() {
        resetActiveState(); // Убираем active класс у текущей категории

        const category = categoryItems[currentCategoryIndex].dataset.category; // Получаем текущую категорию
        setBackgroundImage(category);

        // Устанавливаем ссылку для кнопки "Подробнее"
        if (categoryShopLinks.hasOwnProperty(category)) {
            categoryLink.href = categoryShopLinks[category];
        } else {
            categoryLink.href = "/shop";
        }
        setCategoryDescription(category); // Функция для установки описания

        const activeCategory = categoryItems[currentCategoryIndex];
        activeCategory.classList.add('active'); // Устанавливаем active класс для следующей категории

        startTimer(activeCategory);

        // Увеличиваем индекс, переходя к следующей категории
        currentCategoryIndex = (currentCategoryIndex + 1) % (categoryItems.length - 1);
    }

    function startTimer(element) {
        const timer = element.querySelector('.category-timer'); // Получаем элемент таймера
        timer.style.transform = 'scaleX(0)'; // Сбрасываем значение transform
        timer.style.transition = 'none'; // Убираем transition чтобы не мешало

        // Запускаем анимацию с небольшой задержкой, чтобы сбросилось значение transform
        setTimeout(() => {
          timer.style.transition = 'transform 10s linear'; // Устанавливаем transition
          timer.style.transform = 'scaleX(1)'; // Запускаем анимацию
        }, 50);
    }

    function stopTimer() {
        categoryItems.forEach(item => {
                const timer = item.querySelector('.category-timer');
                timer.style.transition = 'none'; //  Прекращаем анимацию
                timer.style.transform = 'scaleX(0)'; //  Сбрасываем состояние полоски
        })
    }

    // Запускаем функцию показа следующей категории через setInterval
    showNextCategory(); // Инициализация при загрузке страницы
     // Очищаем предыдущий интервал (если есть)
     if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(showNextCategory, 10000);

    // Обработчик клика
    categoryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвратить переход по ссылке
            const category = item.dataset.category;

             // Останавливаем таймер при клике
             clearInterval(timerInterval);
             stopTimer();

            if (category !== 'shop') {
                resetActiveState();

                // Находим индекс кликнутого элемента
                currentCategoryIndex = Array.from(categoryItems).findIndex(el => el === item);
                setBackgroundImage(category);
                setCategoryDescription(category);
                item.classList.add('active');

                startTimer(item)

            };

            // Перезапускаем автоматическую смену категорий
            clearInterval(timerInterval);
            timerInterval = setInterval(showNextCategory, 10000);
        });
    });

    // Обработчик для категории "Подробнее"
    document.querySelector('.featured-description-wrapper .category-link').addEventListener('click', function(event) {
        const activeCategory = document.querySelector('.category-item.active');
            if (activeCategory) {
            window.location.href = (categoryShopLinks[activeCategory.dataset.category]);
            } else{
                window.location.href = ("/shop");
            }

    });
});