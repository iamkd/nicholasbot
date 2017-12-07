import Telegraf, { Markup } from 'telegraf';
import * as R from 'ramda';
import { Op } from 'sequelize';
import { User } from './db';

require('dotenv').config();

// Bot init
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});

// Linking with db
bot.use(async (ctx, next) => {
  console.log(ctx.from);
  const user = await User.findOne({ where: { telegramId: ctx.from.id } });
  if (user) {
    ctx.user = user;
  } else {
    ctx.user = null;
  }
  next(ctx);
});

bot.start(ctx => ctx.reply('Hey! Enter your name.'));

bot.hears(/.*/, async ctx => {
  if (!ctx.user) {
    const { message } = ctx;
    const result = await User.findOne({
      where: { name: { [Op.like]: `${R.trim(message.text)}%` } }
    });
    console.log(result);
  }
});

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
