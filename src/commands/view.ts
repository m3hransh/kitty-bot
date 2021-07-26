import { MessageEmbed } from 'discord.js';
import CamperModel from '../database/models/CamperModel';
import { CommandInt } from '../interfaces/CommandInt';

export const view: CommandInt = {
  name: 'view',
  description: 'View your 30 days challenge',
  run: async (message) => {
    const { author, channel } = message;

    const targetCamperData = await CamperModel.findOne({
      discordId: author.id,
    });

    if (!targetCamperData) {
      await channel.send('You have not started the challenge yet.');
      return;
    }

    const embed = new MessageEmbed();
    embed.setTitle('My 30 days Progress');
    embed.setDescription(
      `Here is my 30 Days of writing. I last reported an update on ${new Date(
        targetCamperData.timestamp,
      ).toLocaleDateString()}`,
    );
    embed.addField('Round', targetCamperData.round, true);
    embed.addField('Day', targetCamperData.day, true);
    embed.setAuthor(
      `${author.username}#${author.discriminator}`,
      author.displayAvatarURL(),
    );

    await channel.send(embed);
    await message.delete();
  },
};
