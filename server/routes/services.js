import express from 'express';
import { readData } from '../utils/storage.js';

const router = express.Router();

/**
 * GET /api/services
 * Returns full or filtered list of services
 */
router.get('/', async (req, res) => {
  try {
    const services = await readData('services.json', []);
    const { category, search } = req.query;

    let result = [...services];

    // Filter by category
    if (category && category !== 'all') {
      if (category === 'lawn') {
        result = result.filter(
          (s) => s.category === 'lawn' || s.category === 'garden'
        );
      } else {
        result = result.filter((s) => s.category === category);
      }
    }

    // Filter by search term
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
      );
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Помилка отримання каталогу послуг', error: error.message });
  }
});

/**
 * GET /api/services/:id
 * Returns a specific service by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const services = await readData('services.json', []);
    const service = services.find((s) => s.id === req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Послугу не знайдено' });
    }

    res.json(service);
  } catch (error) {
    console.error(`Error fetching service ${req.params.id}:`, error);
    res.status(500).json({ message: 'Помилка отримання послуги', error: error.message });
  }
});

export default router;
