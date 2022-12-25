![Проекты](./img/projects.png)

# 💡 Учебный проект &laquo;API на Node.js, Express.js и MongoDB&raquo;
![GitHub language count](https://img.shields.io/github/languages/count/iwebexpert/js-junior-nodejs-api)
![GitHub top language](https://img.shields.io/github/languages/top/iwebexpert/js-junior-nodejs-api)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iwebexpert/js-junior-nodejs-api)
![GitHub issues](https://img.shields.io/github/issues/iwebexpert/js-junior-nodejs-api)
![GitHub pull requests](https://img.shields.io/github/issues-pr/iwebexpert/js-junior-nodejs-api)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/iwebexpert/js-junior-nodejs-api)
![GitHub last commit](https://img.shields.io/github/last-commit/iwebexpert/js-junior-nodejs-api)

Для создания API используется фреймворк Express.js.
В качестве базы данных выбрана MongoDB.
Взаимодействие с базой данных осуществляется через Mongoose ORM.

# 🔧 Настройка перед запуском
Переименуйте файл `.env.example` в `.env`.

- Добавьте любую последовательность символов в переменную окружения `JWT_SIFN_KEY` (используется для создания и верификации JWT);
- В переменную окружения `MONGO_DB_URL` добавьте строку подключения к базе данных MongoDB.

# Docker для MongoDB
Вы можете использовать `docker-compose.yml` для создания и запуска Docker контейнера с MongoDB.

* Если используется конфигурация из `docker-compose.yml` без изменений, то значение переменной окружения `MONGO_DB_URL` необходимо установить в `mongodb://root:1234@localhost:27017/app?authSource=admin`.

# Запуск приложения
```
npm start
```

# Запуск приложения в режиме разработки
В режиме разработки используется npm пакет [nodemon](https://www.npmjs.com/package/nodemon).
```
npm run dev
```

# Запуск приложения в режиме отладки
```
npm run debug # Linux, MacOS
npm run debug-win # Windows
```

# Проверка авторизации пользователя
Проверка авторизации осуществляется двумя способами:
- С помощью пользовательской middleware `./middleware/authMiddleware.js`;
- С помощью библиотеки Passport.js (стратегия `passport-jwt`).

Также, можно отключить проверку авторизации пользователя.

Переключить способ проверки авторизации пользователя можно в файле `app.js`, выбрав нужный вариант.
```js
app.use('/api/projects', passport.authenticate('jwt', { session: false }), routerProjects); // Passport.js
// app.use('/api/projects', authMiddleware, routerProjects); // Пользовательская middleware
// app.use('/api/projects', routerProjects); // Без авторизации
```

# Формы регистрации и авторизации
<img src="./img/registration.png" alt="Форма регистрации" width="500px">
<img src="./img/login.png" alt="Форма авторизации" width="500px">

# Тестирование API
Для тестирования API установите Postman и импортируйте коллекцию из файла `tests/postman-collection.json`.

Также, вы можете указать файл `tests/postman-data-file.json` при запуске тестов через `Collection Runner`. Это необязательно, так как это не влияет на прохождение тестов.
![Проекты](./img/postman.png)

# Код веб-приложения написан с использованием
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

# Лицензия
![GitHub](https://img.shields.io/github/license/iwebexpert/js-junior-nodejs-api)