import mongoose from 'mongoose';
import path from 'path';
import * as R from 'ramda';

import fs from 'fs';
import csvParse from 'csv-parse';
import arrayShuffle from 'array-shuffle';

import userSchema from './models/User';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nicholas');

export const User = mongoose.model('User', userSchema);

User.create({
  name: 'Вікторія Ткачук',
  faculty: 'ФГН',
  year: 'Бакалавр - 2',
  description:
    'Привіт, мій особистий Миколаю :) Сподіваюся, справи у тебе добре) я люблю музичку (я фанат гуртів Linkin Park, Icon for Hire, Evanescence та співачки Avril Lavigne, також обожнюю Avenged Sevenfold і Seether і Sum 41 і Adam Gontier,  але я у принципі закохана в американський роцк і роцк і музику загалом, це моя любов і моє спасіння) і поезію (особливо писати її, тому улюблених авторів не назву, бо, навпаки, хочу розширити свій кругозір у цьому плані і читати більше). Люблю всілякі мотивувальні штуки, що надихають досягати своїх мрій та ставати кращим. Люблю поєднання рожевих, чорних і сірих кольорів і все, що має напівготичний вигляд. Добра тобі! :з',
  phoneNumber: '0976314931',
  telegram: '@victoriatk',
  facebook: 'https://facebook.com/victoria.tkachuck.1',
  count: 313
});

// User.remove({}).then(() =>
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

//       const mapIndexed = R.addIndex(R.map);
//       await Promise.all(
//         mapIndexed(
//           (user, index) => User.create({ ...user, count: index + 1 }),
//           objects
//         )
//       );

//       const users = await User.find({}).exec();
//       const userIds = R.map(user => user.id, users);
//       const shuffledIds = arrayShuffle(userIds);
//       const pairs = R.aperture(2, shuffledIds).concat([
//         [R.last(shuffledIds), R.head(shuffledIds)]
//       ]);

//       R.forEach(async ([userId, targetId]) => {
//         const user = await User.findById(userId).exec();
//         const target = await User.findById(targetId).exec();
//         user.pairId = target.id;
//         user.save();
//       }, pairs);
//     }
//   )
// );
