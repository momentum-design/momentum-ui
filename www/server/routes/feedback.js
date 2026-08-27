import express from 'express';
import config from '../config';
import { formidable } from 'formidable';
import fs from 'fs';

const router = express.Router();

const parseJsonResponse = async (response, operation) => {
  if (!response.ok) {
    throw new Error(`${operation} failed (${response.status}): ${await response.text()}`);
  }
  return response.json();
};

const firstValue = value => (Array.isArray(value) && value.length === 1 ? value[0] : value);

router.route('/').post(async (req, res) => {
  try {
    const tokenResponse = await fetch(config.WP_OAUTH_URL, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        oauth: 'token',
        grant_type: 'client_credentials',
        client_id: process.env.WP_CLIENT_ID,
        client_secret: process.env.WP_CLIENT_SECRET,
      }),
    });
    const { access_token: token } = await parseJsonResponse(tokenResponse, 'WordPress authentication');

    const [fields, uploadedFiles] = await formidable({ multiples: true }).parse(req);
    const feedbackBody = Object.fromEntries(
      Object.entries(fields).map(([name, value]) => [name, firstValue(value)])
    );
    const files = Object.values(uploadedFiles)
      .flatMap(file => (Array.isArray(file) ? file : [file]))
      .filter(Boolean);

    if (files.length) {
      feedbackBody['10'] = [];
      for (const file of files) {
        const filename = file.originalFilename || 'attachment';
        const multipartBody = new FormData();
        multipartBody.append(
          'file',
          new Blob([await fs.promises.readFile(file.filepath)], { type: file.mimetype || 'application/octet-stream' }),
          filename
        );
        const uploadResponse = await fetch(`${config.WP_URL}/wp-json/wp/v2/media`, {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${token}`,
            'Content-Disposition': `attachment; filename=${filename}`,
          },
          body: multipartBody,
        });
        const uploadedImage = await parseJsonResponse(uploadResponse, 'WordPress media upload');
        feedbackBody['10'].push(uploadedImage.source_url);
      }
    }

    const formResponse = await fetch(`${config.WP_FORMS_URL}/entries`, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedbackBody),
    });
    res.json(await parseJsonResponse(formResponse, 'WordPress form submission'));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
