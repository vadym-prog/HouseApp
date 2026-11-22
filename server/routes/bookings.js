import express from 'express';
import { readData, writeData } from '../utils/storage.js';
import { optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/bookings
 * Returns bookings list
 */
router.get('/', optionalAuthMiddleware, async (req, res) => {
  try {
    const bookings = await readData('bookings.json', []);

    // If authenticated, we can optionally filter by user's phone or email or id
    if (req.user) {
      const userBookings = bookings.filter(
        (b) =>
          b.userId === req.user.id ||
          (b.data?.email && b.data.email.toLowerCase() === req.user.email.toLowerCase()) ||
          (b.data?.phone && req.user.phone && b.data.phone.replace(/\D/g, '') === req.user.phone.replace(/\D/g, ''))
      );

      // Return user bookings if found, or all if no user-specific bookings exist yet
      return res.json(userBookings.length > 0 ? userBookings : bookings);
    }

    res.json(bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ message: 'Помилка отримання списку заявок', error: error.message });
  }
});

/**
 * POST /api/bookings
 * Creates a new master booking request
 */
router.post('/', optionalAuthMiddleware, async (req, res) => {
  try {
    const { phone, clientName, serviceId, serviceName, category, date, timeSlot, address, description, contactMethod } = req.body;

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      return res.status(400).json({ message: 'Введіть коректний номер телефону (від 9 цифр)' });
    }

    const bookings = await readData('bookings.json', []);

    const newBooking = {
      id: `bk_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      userId: req.user?.id || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      data: {
        clientName: clientName || req.user?.name || 'Клієнт',
        phone: phone.trim(),
        serviceId: serviceId || null,
        serviceName: serviceName || 'Послуга майстра',
        category: category || 'all',
        date: date || new Date().toISOString().split('T')[0],
        timeSlot: timeSlot || 'Терміново (до 45 хв)',
        address: address || 'Узгоджується з диспетчером',
        description: description || 'Виклик майстра з сайту',
        contactMethod: contactMethod || 'phone',
      },
      message: 'Заявку успішно прийнято диспетчером',
    };

    bookings.unshift(newBooking);
    await writeData('bookings.json', bookings);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Помилка створення заявки', error: error.message });
  }
});

export default router;
