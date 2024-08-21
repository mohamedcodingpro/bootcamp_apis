// api/enough_airtime.js
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { usage, available } = req.body;
  const items = usage.split(',');

  let totalCost = items.reduce((acc, item) => {
    if (item === 'call') return acc + 2.75;
    if (item === 'sms') return acc + 0.65;
    return acc;
  }, 0);

  const result = available - totalCost;

  res.json({ result });
});

export default router;
