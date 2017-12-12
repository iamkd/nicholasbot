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
  name: 'Ярослав Кладько',
  faculty: 'ФІ',
  year: 'Бакалавр - 3',
  description:
    '(варіант для лінивих)хочу зимові рукавички або шапку (хлопець 19р), а взагалі знімаю влоги, програмую, люблю літературу, а також спорт і робити всякі екстремальні штуки😂 ',
  phoneNumber: '+380633695635',
  telegram: '@laurelShark',
  facebook: 'https://www.facebook.com/yarikhacker',
  count: 310
});

User.create({
  name: 'Аліна Богуславська',
  faculty: 'ФІ',
  year: 'Бакалавр - 2',
  description:
    'Займаюсь розробкою мобільних  додатків, достатньо творча людина: подобається пепакура, леттерінг, займаюсь бадмінтоном,  обожнюю лампові кав‘ярні',
  phoneNumber: '0503858714',
  telegram: '@boguzlada',
  facebook: 'https://m.facebook.com/alibogzl',
  count: 311
});

User.create({
  name: 'Надія Гришко',
  faculty: 'ФІ',
  year: 'Бакалавр - 2',
  description:
    'Я життєрадісна і позитивна людина. Люблю навчання і друзів. Але головне моє захоплення - це кулінарія! Це те, що мені дійсно подобається, те, чим я можу займатися цілодобово. Я люблю готувати все, від десертів до перший страв, але сама я солодке не їм. Обожнюю всякі кулінарні штучки, формочки, набори, ланч-бокси) Але для мене важливо, щоб речі були практичними, не одноразовими. Ніколи не розуміла квіти як подарунок, вони ж через день вже засохнуть((( Напевно, я не романтик😌. Ось, ніби все...',
  phoneNumber: '0958858595',
  telegram: '@NadezhdaGrishko',
  count: 312
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
