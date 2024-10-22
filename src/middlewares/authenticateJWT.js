import jwt from 'jsonwebtoken';
import { env } from '../configs/environment.js';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, env.APP_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateJWT;
