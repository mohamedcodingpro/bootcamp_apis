// api/phonebill.js
import express from 'express';

const router = express.Router();

let callPrice = 2.75;
let smsPrice = 0.65;

router.post('/total', (req, res) => {
  const bill = req.body.bill || '';
  const items = bill.split(',');

  const total = items.reduce((acc, item) => {
    if (item === 'call') return acc + callPrice;
    if (item === 'sms') return acc + smsPrice;
    return acc;
  }, 0);

  res.json({ total });
});

router.get('/prices', (req, res) => {
  res.json({ call: callPrice, sms: smsPrice });
});

router.post('/price', (req, res) => {
  const { type, price } = req.body;
  if (type === 'call') {
    callPrice = price;
    res.json({ status: 'success', message: `The call price was set to ${price}` });
  } else if (type === 'sms') {
    smsPrice = price;
    res.json({ status: 'success', message: `The SMS price was set to ${price}` });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid type' });
  }
});

export default router;
