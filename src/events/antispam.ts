import { GuildTextBasedChannel } from 'discord.js';
import { antispamTooFast } from '../assets/contents';
import { spams } from '../maps/spam';
import { Event } from '../structures/Event';

export default new Event('messageCreate', async (message) => {
    if (!message.guild) return;
    if (process.env.antispam !== 'true') return;
    if (!message.author) return;

    if (message.author.id === message.guild.ownerId || message.member.permissions.has('ManageMessages', true)) return;
    const data = (spams.get(message.author?.id) || 0) + 1;
    const maxMessages = parseInt(process.env.antispamMaxCount) ?? 10;
    const time = (parseInt(process.env.antispamTime) ?? 10) * 1000;

    if (data >= maxMessages) {
        if (message.member.moderatable) {
            message.member.timeout(60000 * 5, 'antispam').catch(() => {});
            message.channel.send(antispamTooFast(message.author)).catch(() => {});
        }
    } else {
        spams.set(message.author.id, data);
        if (data === 1) {
            setTimeout(() => {
                spams.delete(message.author.id);
            }, time);
        }
    }
});
