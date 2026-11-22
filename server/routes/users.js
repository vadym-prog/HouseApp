import express from 'express';
import { readData, writeData } from '../utils/storage.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

function sanitizeUser(user) {
  const { passwordHash: _hash, ...safeUser } = user;
  return safeUser;
}

/**
 * PUT /api/users/profile
 * Updates authenticated user's profile details
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const users = await readData('users.json', []);
    const userIndex = users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    const current = users[userIndex];
    const { name, phone, city, avatarUrl, addresses, specialization, experience } = req.body;

    const updated = {
      ...current,
      ...(name !== undefined && { name: name.trim() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(city !== undefined && { city: city.trim() }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(addresses !== undefined && Array.isArray(addresses) && { addresses }),
      ...(specialization !== undefined && { specialization }),
      ...(experience !== undefined && { experience }),
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updated;
    await writeData('users.json', users);

    res.json({
      message: 'Профіль успішно оновлено',
      user: sanitizeUser(updated),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Помилка оновлення профілю', error: error.message });
  }
});

export default router;
