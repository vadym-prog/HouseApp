import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readData, writeData } from '../utils/storage.js';
import { authMiddleware, JWT_SECRET } from '../middleware/auth.js';

const router = express.Router();

function sanitizeUser(user) {
  const { passwordHash: _hash, ...safeUser } = user;
  return safeUser;
}

/**
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, city, specialization, experience, addresses, avatarUrl } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Ім'я повинно містити щонайменше 2 символи" });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Введіть коректну електронну пошту' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Пароль повинен містити не менше 6 символів' });
    }

    const users = await readData('users.json', []);
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'Користувач із такою електронною поштою вже існує' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || '',
      passwordHash,
      role: role === 'master' ? 'master' : 'client',
      city: city?.trim() || 'Київ',
      specialization: specialization || null,
      experience: experience || null,
      addresses: addresses && Array.isArray(addresses) ? addresses : ['вул. Садова, 14'],
      avatarUrl: avatarUrl || null,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeData('users.json', users);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Реєстрація успішна',
      user: sanitizeUser(newUser),
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Помилка реєстрації на сервері', error: error.message });
  }
});

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Введіть email/телефон та пароль' });
    }

    const users = await readData('users.json', []);
    const identifier = emailOrPhone.trim().toLowerCase();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === identifier ||
        (u.phone && u.phone.replace(/\D/g, '') === identifier.replace(/\D/g, ''))
    );

    if (!user) {
      return res.status(401).json({ message: 'Користувача не знайдено або невірні дані входу' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Успішний вхід',
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Помилка авторизації на сервері', error: error.message });
  }
});

/**
 * GET /api/auth/me
 * Protected endpoint returning current user profile
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const users = await readData('users.json', []);
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Профіль користувача не знайдено' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(500).json({ message: 'Помилка перевірки сесії', error: error.message });
  }
});

export default router;
