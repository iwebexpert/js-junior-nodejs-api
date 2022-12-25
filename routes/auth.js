const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/registration', async (req, res) => {
  try {
    const {repassword, ...restBody} = req.body;
    if(restBody.password !== repassword){
      throw new Error('Пароли не совпадают');
    }

    const user = new User(restBody);
    if(await user.save()){
      res.json({...user.toObject(), password: 'hidden'});
    } else {
      throw new Error('Пользователь с таким e-mail уже существует');
    }
  } catch(err){
      // console.log(err);
      let message = err.message;
      if(err.code === 11000){
        message = 'Пользователь с таким e-mail уже существует';
      }
      res.status(400).json({message: message});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(401).json({message: 'Не введены email и/или password'});
  }

  const user = await User.findOne({email: email});

  if(!user){
    return res.status(401).json({message: 'Пользователь не был найден'});
  }

  if(!user.validatePassword(password)){
    return res.status(401).json({message: 'Неправильная пара логин/пароль'});;
  }

  const plainUser = user.toObject();
  delete plainUser.password;

  res.status(200).json({
    ...plainUser,
    token: jwt.sign(plainUser, process.env.JWT_SIFN_KEY),
  });
});

module.exports = router;