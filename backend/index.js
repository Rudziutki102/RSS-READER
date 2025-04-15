import express from 'express';
import RSSParser from 'rss-parser';
import cors from 'cors';

const app = express();
const port = 3000;
const parser = new RSSParser();

app.use(cors());

app.get('/rss', async (req, res) => {
  const feedUrl = req.query.url;

  if (!feedUrl) {
    return res.status(400).json({ error: 'Invalid_URL' });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json({
      title: feed.title,
      items: feed.items,
    });
  } catch (error) {
    console.error('Błąd parsowania RSS:', error.message);
    res.status(500).json({ error: "Can't parse RSS" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serwer RSS działa na http://localhost:${port}`);
});
