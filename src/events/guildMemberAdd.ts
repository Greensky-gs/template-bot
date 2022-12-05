import { AmethystEvent } from 'amethystjs';
import { MessageCreateOptions, TextChannel } from 'discord.js';
import { getVar } from '../assets/contents';

export default new AmethystEvent('guildMemberAdd', async (member) => {
    if (!process.env.joinChannel) return;
    const { guild, client } = member;
    const channel = client.channels.cache.get(process.env.joinChannel);

    if (!channel) return;

    await (channel as TextChannel)
        .send(getVar('welcome', 'message', member.id, false) ?? `Hey <@${member.id}> !`)
        .catch(() => {});

    if (process.env.joinImage === 'true') {
        const link = `https://api.discorddevtools.xyz/welcome-image-generator/generate.png?title=${getVar(
            'welcome',
            'title',
            'nothing'
        )}&username=${getVar('welcome', 'username', member.user.username)}&discriminator=${getVar(
            'welcome',
            'discriminator',
            member.user.discriminator
        )}&text=${getVar('welcome', 'text', 'n')}&image=${member.user.avatarURL()}`;

        (channel as TextChannel).send(link).catch(() => {});
    }
});
