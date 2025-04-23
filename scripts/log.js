document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'http://localhost:3333/api'; // URL вашего сервера

    // Регистрация
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            // Очистка сообщений об ошибках
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            // Валидация
            let hasErrors = false;
            if (!name) {
                document.getElementById('nameError').textContent = 'Введите имя.';
                hasErrors = true;
            }
            if (!email) {
                document.getElementById('emailError').textContent = 'Введите email.';
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Неверный формат email.';
                hasErrors = true;
            }
            if (!password) {
                document.getElementById('passwordError').textContent = 'Введите пароль.';
                hasErrors = true;
            } else if (password.length < 6) {
                document.getElementById('passwordError').textContent = 'Пароль должен быть не менее 6 символов.';
                hasErrors = true;
            }
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Пароли не совпадают.';
                hasErrors = true;
            }

            if (!hasErrors) {
                try {
                    const response = await fetch(`${API_URL}/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email, password }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        alert('Регистрация прошла успешно!');
                        window.location.href = 'login.html'; // Перенаправление на страницу входа
                    } else {
                        throw new Error(data.message || 'Произошла ошибка при регистрации.');
                    }
                } catch (error) {
                    console.error('Ошибка при регистрации:', error);
                    alert(error.message || 'Произошла ошибка при регистрации.');
                }
            }
        });
    }

    // Вход
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Очистка сообщений об ошибках
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            let hasErrors = false;
            if (!email) {
                document.getElementById('emailError').textContent = 'Введите email.';
                hasErrors = true;
            }
            if (!password) {
                document.getElementById('passwordError').textContent = 'Введите пароль.';
                hasErrors = true;
            }

            if (!hasErrors) {
                try {
                    const response = await fetch(`${API_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        alert('Вход выполнен успешно!');
                        localStorage.setItem('user', JSON.stringify(data.user)); // Сохраняем пользователя
                        window.location.href = 'Главное.html'; // Перенаправление на страницу магазина
                    } else {
                        throw new Error(data.message || 'Неверный email или пароль.');
                    }
                } catch (error) {
                    console.error('Ошибка при входе:', error);
                    alert(error.message || 'Произошла ошибка при входе.');
                }
            }
        });
    }

    // Функция для проверки формата email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});