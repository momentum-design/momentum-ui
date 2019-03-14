import express from 'express';
import fetch from 'node-fetch';
import config from '../config';
import Component from '../models/component';
import combineComponentData from '../tools/combineComponentData';

const router = express.Router();

router.route('/:id').get(async (req, res) => {
  try {
    const pageId = req.params.id;
    const wpFetch = await fetch(`${config.WP_PAGES_URL}/${pageId}`);
    const wpPage = await wpFetch.json();
    const codeComponent = await Component.findOne({ id: pageId });
    const page = await combineComponentData(wpPage, codeComponent);
    res.json(page);
  } catch (err) {
    res.send(err);
  }
});

router.route('/id/:id').get(async (req, res) => {
  try {
    const pageId = req.params.id;
    const wpFetch = await fetch(`${config.WP_CONTENT_URL}/${pageId}`);
    const wpPage = await wpFetch.json();
    res.json(wpPage);
  } catch (err) {
    res.send(err);
  }
});

router.route('/name/:slug').get(async (req, res) => {
  try {
    const pageSlug = req.params.slug;
    const wpFetch = await fetch(`${config.WP_PAGES_URL}/name/${pageSlug}`);
    const wpPage = await wpFetch.json();
    const page = await combineComponentData(wpPage);
    res.json(page);
  } catch (err) {
    res.send(err);
  }
});

router.route('/name/:slug/children').get(async (req, res) => {
  try {
    const pageSlug = req.params.slug;
    const wpFetch = await fetch(`${config.WP_CHILD_PAGES_URL}/${pageSlug}`);
    const wpPage = await wpFetch.json();
    res.json(wpPage);
  } catch (err) {
    res.send(err);
  }
});

export default router;
