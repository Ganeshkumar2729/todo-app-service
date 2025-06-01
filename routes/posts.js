import express from 'express';
const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await req.db.collection('tasks').find().toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST a new post  
router.post('/createtask', async (req, res) => {
  try {
    const result = await req.db.collection('tasks').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

export default router;
