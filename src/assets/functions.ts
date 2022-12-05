import { CommandInteraction, InteractionReplyOptions, User } from 'discord.js';

export const systRep = (interaction: CommandInteraction, reply: InteractionReplyOptions) => {
    const fnt = interaction.replied || interaction.deferred ? 'editReply' : 'reply';
    return interaction[fnt](reply);
};
export const userName = (user: User) => `<@${user.id}> ( ${user.tag} \`${user.id}\` )`;
export const dateNow = () => `<t:${(Date.now() / 1000).toFixed(0)}:F> ( <t:${(Date.now() / 1000).toFixed(0)}:R> )`;
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
export const resizeString = ({ str, maxLength = 1000 }: { str: string; maxLength?: number }) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
};
