import { Client } from 'discord.js';

(async () => {
  const bot = new Client();
  bot.on('ready', () => console.log('Connected to Discord!'));
  await bot.login(process.env.BOT_TOKEN);
})();
