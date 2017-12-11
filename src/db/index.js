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
  _id: '9dfb7e1b-e0ec-4bfd-911e-dafcfd97669c',
  faculty: 'ФСНСТ',
  year: 'Бакалавр - 1',
  description:
    'Нeнавиджу пізню творчість Павла Тичини, в захваті від Дeвіда Лінча, котиків (в мeнe троє), і атмосфeрних рeчeй. Фотографую на плівковий фотік, ОБОЖНЮЮ каву і максимально аутeнтичні/унікальні рeчі. Цікавлюся індустрією моди, мрію співпрацювати із Vogue. Всe,зроблeнe від сeрця,бeрeжу,начe зіницю ока💔👀',
  phoneNumber: '0684999706',
  telegram: '@palyanaa',
  count: 309,
  name: 'Поліна Геращенко',
  pairId: 'dbaca040-53c8-487d-acee-97a7bc6d153c'
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
