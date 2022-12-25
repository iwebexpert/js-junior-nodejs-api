const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

const routerProjects = require('./routes/projects');
const routerAuth = require('./routes/auth');

const authMiddleware = require('./middleware/authMiddleware');
const passport = require('./middleware/passportMiddleware');

const mongoose = require('mongoose');
const mongoDBConnectionString = process.env.MONGO_DB_URL;
mongoose.set('strictQuery', false); 

const app = express();

app.use(express.json({limit: '1mb'})); //JSON
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'})); //Обычная форма
app.use(multer({limits: {fileSize: 1e7, fieldNameSize: 100, fieldSize: 1e6}}).array());
app.use(passport.initialize());

const whiteListDomains = ['http://localhost:4000', 'http://localhost:3000'];
const corsOptionsFunc = function (req, callback){
  let corsOptions;
  if(whiteListDomains.indexOf(req.header('Origin')) !== -1){
    corsOptions = {origin: true, optionsSuccessfulStatus: 200};
  } else {
    corsOptions = {origin: false, optionsSuccessfulStatus: 200};
  }
  callback(null, corsOptions);
};
app.use(cors(corsOptionsFunc));

app.use('/projects', (req, res, next) => {
  console.log(`Метод запроса: ${req.method}`);
  if(req.method === 'POST'){
    res.status(405);
    res.end();
    return;
  }
  next();
});


app.use('/api/projects', passport.authenticate('jwt', { session: false }), routerProjects);
// app.use('/api/projects', authMiddleware, routerProjects);
// app.use('/api/projects', routerProjects);

app.use('/api/auth', routerAuth);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  if(err.status === 413){
    res.status(413);
    res.send('Ошибка 413. Payload Too Large');
    return;
  }

  res.status(500);
  res.send('Сервер недоступен по техническим причинам');
});

app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.resolve(__dirname, 'public', '404.html'));
});



const start = async () => {
  try {
    await mongoose.connect(mongoDBConnectionString).then(() => {
      console.log("MongoDB. Успешное соединение");
    });
    app.listen(3000, () => {
      console.log(`http://localhost:3000/`);
    });
  } catch(err){
    console.log("MongoDB. Ошибка подключения");
    console.error(err);
    process.exit(1);
  }
};

start();

// Ctrl-c
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit(0);
});