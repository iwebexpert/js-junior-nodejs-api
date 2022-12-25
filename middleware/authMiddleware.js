const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  if(req.headers.authorization){
    const [type, token] = req.headers.authorization.split(' ');

    jwt.verify(token, process.env.JWT_SIFN_KEY, (err, decoded) => {
      if(err){
        return res.status(403).end();
      }

      req.user = decoded;

      next();
    });
  } else {
    return res.status(403).end();
  }
}

module.exports = authMiddleware;