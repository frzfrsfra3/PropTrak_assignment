// middleware/authenticate.js
import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from '../request-errors/index.js';

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_OWNER) ||
                    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_TENANT);

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new UnAuthorizedError('Invalid token');
  }
};

export default authenticateUser;
