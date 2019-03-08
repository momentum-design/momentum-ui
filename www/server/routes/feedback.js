import express from 'express';
import config from '../config';
import request from 'request-promise-native';
import formidable from 'formidable';
import fs from 'fs';

const router = express.Router();

router.route('/').post(async (req, res) => {
  let hasAttachment = false;
  try {
    const tokenOptions = {
      method: 'POST',
      url: `${config.WP_OAUTH_URL}`,
      qs: { oauth: 'token' },
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        grant_type: 'client_credentials',
        client_id: process.env.WP_CLIENT_ID,
        client_secret: process.env.WP_CLIENT_SECRET,
      },
      json: true,
    };

    const oAuth = await request(tokenOptions);
    const token = oAuth.access_token;

    const incomingForm = new formidable.IncomingForm();
    const feedbackBody = {};
    const files = [];

    incomingForm
      .parse(req)
      .on('field', (name, field) => {
        feedbackBody[name] = field;
      })
      .on('file', (name, file) => {
        const fileData = {
          value: fs.createReadStream(file.path),
          options: {
            filename: file.name,
            contentType: file.type
          }
        };
        files.push(fileData);
        hasAttachment = true;
      })
      .on('end', async () => {
        try {
          if (hasAttachment) {
            feedbackBody['10'] = [];
            for (let file of files) {
              const imageUploadOptions = {
                method: 'POST',
                url: `${config.WP_URL}/wp-json/wp/v2/media`,
                headers: {
                  'Cache-Control': 'no-cache',
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                  processData: false,
                  'Content-Disposition': `attachment; filename=${file.options.filename}`,
                },
                formData: { file },
                json: true,
              };

              const uploadedImage = await request(imageUploadOptions);
              feedbackBody['10'].push(uploadedImage.source_url);

            }
          }

          const formOptions = {
            method: 'POST',
            url: `${config.WP_FORMS_URL}/entries`,
            headers: {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: feedbackBody,
            json: true,
          };

          const postForm = await request(formOptions);
          res.json(postForm);
        } catch (err) {
          res.status(500);
          res.send(err.message);
        }
      });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

export default router;
