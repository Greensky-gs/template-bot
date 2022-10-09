import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { ban, banError, banMsgToMember } from '../assets/contents';
import { checkPerms } from '../assets/functions';
import { Command } from '../structures/Command';

export default new Command({
    name: 'ban',
    description: 'Ban a member from the server',
    options: [
        {
            name: 'member',
            description: 'Member to ban',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    permissions: [{ name: 'ban members', perm: 'BanMembers' }],
    run: async ({ interaction, args }) => {
        const member = args.getMember('member') as GuildMember;
        if (
            !checkPerms({
                interaction,
                mod: interaction.member,
                member: member,
                checkOwner: true,
                checkSelfUser: true
            })
        )
            return;
        await interaction.deferReply();

        await member.send(banMsgToMember(interaction.user, interaction.guild.name)).catch(() => {});
        const result = await member
            .ban({
                reason: `Banned by ${interaction.user.tag} ( ${interaction.user.id} )`
            })
            .catch(() => {
                interaction.editReply(banError(interaction.user, member.user)).catch(() => {});
            });

        if (result) interaction.editReply(ban(interaction.user, member.user)).catch(() => {});
    }
});
