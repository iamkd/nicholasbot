import Sequelize from 'sequelize';
import path from 'path';
import * as R from 'ramda';

import fs from 'fs';
import csvParse from 'csv-parse';
import arrayShuffle from 'array-shuffle';

import userSchema from './models/User';

const sequelize = new Sequelize('nicholasdb', 'bot', process.env.BOT_PASSWORD, {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, './data.db')
});

export const User = userSchema(sequelize);

User.hasOne(User, { as: 'pair' });

User.sync();

// User.sync({ force: true }).then(() => {
//   csvParse(
//     fs.readFileSync(path.resolve(__dirname, './data.csv'), 'utf8'),
//     async (err, result) => {
//       const objects = R.map(
//         R.zipObj([
//           'date',
//           'name',
//           'faculty',
//           'year',
//           'description',
//           'telegram',
//           'facebook',
//           'phoneNumber',
//           'message'
//         ]),
//         result
//       );

//       R.forEach(user => User.create(user), objects);

//       const users = await User.findAll();
//       const userIds = R.map(user => user.get('id'), users);
//       const shuffledIds = arrayShuffle(userIds);

//       const pairs = R.aperture(2, shuffledIds).concat([
//         [R.last(shuffledIds), R.head(shuffledIds)]
//       ]);

//       R.forEach(async ([userId, targetId]) => {
//         const user = await User.findById(userId);
//         const target = await User.findById(targetId);
//         user.setPair(target);
//       }, pairs);
//     }
//   );
// });
