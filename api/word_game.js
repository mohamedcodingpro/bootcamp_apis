// api/word_game.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const sentence = req.query.sentence || '';
  const words = sentence.split(' ');

  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  const shortestWord = words.reduce((a, b) => (b.length < a.length ? b : a), '');
  const sum = words.reduce((acc, word) => acc + word.length, 0);

  res.json({
    longestWord: longestWord.length,
    shortestWord,
    sum,
  });
});

export default router;
