import express from 'express';
import fetch from 'node-fetch';
import config from '../config';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const wpFetch = await fetch(`${config.WP_MENUS_URL}/2`);
    const wpMenu = await wpFetch.json();
    res.json(wpMenu);
} catch (err) {
    res.send(err);
  }
});

export default router;
