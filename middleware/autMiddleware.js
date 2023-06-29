const jwt = require('jsonwebtoken');

const secretKey = 'Sasha1234';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      req.user = user;

      next();
    });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authenticateToken;
