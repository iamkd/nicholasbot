import express from 'express';
import path from 'path';
import * as R from 'ramda';

import { User } from '../db';

const app = express();
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/pairs', async (req, res) => {
  const users = await User.find({}).exec();
  res.render('pairs', { users: R.sort((a, b) => a.count - b.count, users) });
});

app.get('*', async (req, res) => {
  const users = await User.find({}).exec();
  res.render('index', { users: R.sort((a, b) => a.count - b.count, users) });
});

export default app;
