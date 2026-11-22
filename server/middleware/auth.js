import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'master_dim_secret_key_2026';

/**
 * Required authentication middleware
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Необхідна авторизація: токен відсутній' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недійсний або прострочений токен авторизації', error: error.message });
  }
}

/**
 * Optional authentication middleware
 * Attaches req.user if token is present, but doesn't block if missing
 */
export function optionalAuthMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch {
      // Ignore token verification errors for optional routes
    }
  }

  next();
}
