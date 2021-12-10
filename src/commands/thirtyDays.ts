import { CommandInt } from '../interfaces/CommandInt';
import CamperModel from '../database/models/CamperModel';
import { MessageEmbed } from 'discord.js';

export const thirtyDays: CommandInt = {
  name: '30',
  description: 'Creates a 30 days Writing challenge',
  run: async (message) => {
    const { author, channel, content } = message;
    const text = content.split(' ').slice(1).join(' ');
    let targetCamperData = await CamperModel.findOne({
      discordId: author.id,
    });

    if (!targetCamperData) {
      targetCamperData = await CamperModel.create({
        discordId: author.id,
        round: 1,
        day: 1,
        timestamp: Date.now(),
      });
    } else {
      targetCamperData.day++;
      if (targetCamperData.day > 30) {
        targetCamperData.day = 1;
        targetCamperData.round++;
      }
      targetCamperData.timestamp = Date.now();
      await targetCamperData.save();
    }

    const embed = new MessageEmbed();
    embed.setTitle('30 Days of IELTS Writing');
    embed.setDescription(text);
    embed.setAuthor(
      author.username + '#' + author.discriminator,
      author.displayAvatarURL(),
    );
    embed.addField('Round', targetCamperData.round, true);
    embed.addField('Day', targetCamperData.day, true);
    embed.setFooter(
      'Day completed: ' +
        new Date(targetCamperData.timestamp).toLocaleDateString(),
    );

    await channel.send(embed);
    await message.delete();
  },
};
