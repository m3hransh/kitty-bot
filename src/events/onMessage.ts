import { Message } from 'discord.js';
import { CommandList } from '../commands/_CommandList';

const prefix = '!';

export const onMessage = async (message: Message) => {
  // preventing the bot to respond itself or other bots
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  for (const Command of CommandList) {
    if (message.content.startsWith(prefix + Command.name)) {
      await Command.run(message);
      break;
    }
  }
};
