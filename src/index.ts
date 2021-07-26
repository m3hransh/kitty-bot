import { Client } from 'discord.js';
import { connectDatabase } from './connectDatabase';
import { validateEnv } from './utils/validateEnv';
import { onMessage } from './events/onMessage';

(async () => {
  if (!validateEnv()) return;

  const bot = new Client();

  bot.on('ready', () => console.log('Connected to Discord!'));

  bot.on('message', async (message) => await onMessage(message));

  await connectDatabase();

  await bot.login(process.env.BOT_TOKEN);
})();
