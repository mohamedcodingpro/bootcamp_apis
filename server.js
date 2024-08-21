// server.js
import express from 'express';
import wordGameRoutes from './api/word_game.js';
import phoneBillRoutes from './api/phonebill.js';
import enoughAirtimeRoutes from './api/enough_airtime.js';

const app = express();
app.use(express.json());

app.use('/api/word_game', wordGameRoutes);
app.use('/api/phonebill', phoneBillRoutes);
app.use('/api/enough', enoughAirtimeRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
