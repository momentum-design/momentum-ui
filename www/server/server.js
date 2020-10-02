import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes';
import config from './config';

const app = express();
const port = config.PORT;


mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.info('connection succesful')) // eslint-disable-line no-console
  .catch(err => console.error(err)); // eslint-disable-line no-console


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.listen(port);

console.info('Magic happens on port ' + port); // eslint-disable-line no-console
