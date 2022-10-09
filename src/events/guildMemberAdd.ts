import { ChannelType } from 'discord.js';
import { join } from '../assets/contents';
import { Event } from '../structures/Event';

export default new Event('guildMemberAdd', (member) => {
    if (member.guild.id !== process.env.guild) return;
    const channel = member.guild.channels.cache.get(process.env.joinChannel ?? '');

    if (channel && channel.type === ChannelType.GuildText) {
        const data = join(member.user);
        channel.send(data).catch(() => {});
    }
});
