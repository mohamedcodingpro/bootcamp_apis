import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let callPrice = 2.75;
let smsPrice = 0.65;

// Words Widget API
app.get('/api/word_game', (req, res) => {
  const sentence = req.query.sentence;
  const words = sentence.split(/\s+/);
  const longestWord = Math.max(...words.map(word => word.length));
  const shortestWord = words.reduce((shortest, current) => current.length < shortest.length ? current : shortest, words[0]);
  const sum = words.reduce((acc, word) => acc + word.length, 0);

  res.json({
    longestWord,
    shortestWord,
    sum
  });
});

// Phone Bill API
app.post('/api/phonebill/total', (req, res) => {
  const { bill } = req.body;
  const commands = bill.split(',');
  const total = commands.reduce((acc, command) => {
    if (command === 'call') return acc + callPrice;
    if (command === 'sms') return acc + smsPrice;
    return acc;
  }, 0);

  res.json({
    total: total.toFixed(2)
  });
});

app.get('/api/phonebill/prices', (req, res) => {
  res.json({
    call: callPrice,
    sms: smsPrice
  });
});

app.post('/api/phonebill/price', (req, res) => {
  const { type, price } = req.body;
  if (type === 'call') {
    callPrice = price;
  } else if (type === 'sms') {
    smsPrice = price;
  }
  res.json({
    status: 'success',
    message: `The ${type} price was set to ${price}`
  });
});

// Enough Airtime API
app.post('/api/enough', (req, res) => {
  const { usage, available } = req.body;
  const commands = usage.split(',');
  const totalCost = commands.reduce((acc, command) => {
    if (command === 'call') return acc + callPrice;
    if (command === 'sms') return acc + smsPrice;
    return acc;
  }, 0);

  res.json({
    result: (available - totalCost).toFixed(2)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});