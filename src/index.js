import Telegraf, { Markup } from 'telegraf';
import * as R from 'ramda';
import { User } from './db';
import server from './server';

require('dotenv').config();

const notFoundMessage = `Ойой, нам не вдалось тебе знайти 🙊😱, спробуй, будь ласка, ще раз, або зв’яжись із кимось із помічників Миколая: @AnastasiaChubko @iamdashk @mariiarioty 😇
`;

async function getPairMessage(user) {
  const pair = await User.findById(user.pairId).exec();
  return `
Отже, людина, якій ти повинен підготувати подарунок навчається на ${
    pair.faculty
  }, ${pair.year}. 

Вона розповіла про себе таке:
${pair.description}

Приготуй подарунок 🎁  для цієї людини, напиши на ньому/прикріпи до нього номер ${
    pair.count
  } та принось у радіорубку на 2 плацу (4 – 106) до 18 грудня включно. Свій подарунок ти зможеш забрати 19 грудня з 10.00 до 18.00 у тому ж місці! 😉

Успіхів у пошуках ідеального подарунку тобі! ✨

З любов’ю, 
команда Таємного Миколая
`;
}

// Bot init
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});

// Linking with db
bot.use(async (ctx, next) => {
  const user = await User.findOne({ telegramId: ctx.from.id }).exec();
  if (user) {
    ctx.user = user;
  } else {
    ctx.user = null;
  }
  next(ctx);
});

bot.start(ctx =>
  ctx.reply(
    `Хей-хо! Ми хочемо вірити, що у тебе святковий настрій, але, якщо це не так, ми знаємо, як це змінити! 😏🙈 Тільки нам потрібно дізнатись твоє прізвище, введи його, будь ласка. ☺️`
  )
);

bot.on('message', async ctx => {
  if (!ctx.user) {
    const { message } = ctx;
    const result = await User.find({
      name: { $regex: new RegExp(R.trim(message.text), 'i') }
    });
    if (result.length === 0) {
      ctx.reply(notFoundMessage);
    } else if (result.length === 1) {
      const user = result[0];
      ctx.reply(
        `${user.name} — це ти?`,
        Markup.inlineKeyboard([
          Markup.callbackButton('Так', `login+${user.id}`),
          Markup.callbackButton('Ні', 'notme')
        ]).extra()
      );
    } else {
      ctx.reply(
        `Ойой, я знайшов більше одної людини с таким ім'ям 😱 Натисни на своє ім'я, будь ласка ✨`,
        Markup.inlineKeyboard(
          R.map(
            user => Markup.callbackButton(user.name, `login+${user.id}`),
            result
          ),
          { columns: 3 }
        ).extra()
      );
    }
  } else {
    ctx.reply(await getPairMessage(ctx.user));
  }
});

bot.action(/login\+(.*)/, async ctx => {
  if (!ctx.user) {
    const id = ctx.match[1];
    const user = await User.findByIdAndUpdate(id, {
      telegramId: ctx.from.id
    }).exec();
    ctx.reply(await getPairMessage(user));
  } else {
    ctx.reply(await getPairMessage(ctx.user));
  }
});

bot.action('notme', ctx => ctx.reply(notFoundMessage));

// Bot start
if (
  process.env.WEBHOOK_URL &&
  process.env.WEBHOOK_SECRET &&
  process.env.CERT_PATH
) {
  const fullUrl = process.env.WEBHOOK_URL + process.env.WEBHOOK_SECRET;
  const certPath = process.env.CERT_PATH;

  const tlsOptions = {
    key: fs.readFileSync(path.join(certPath, 'privkey1.pem')),
    cert: fs.readFileSync(path.join(certPath, 'fullchain1.pem')),
    ca: [fs.readFileSync(path.join(certPath, 'chain1.pem'))]
  };

  bot.telegram.setWebhook(fullUrl, null, 5000).then(() => {
    bot.startWebhook(process.env.WEBHOOK_SECRET, tlsOptions, 8443);
  });
} else {
  bot.telegram.deleteWebhook().then(() => bot.startPolling());
}

server.listen(3019, () => console.log('Express stats listening on port 3019!'));
