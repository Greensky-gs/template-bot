import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { kick, kickError, kickMsgToMember } from "../assets/contents";
import { checkPerms } from "../assets/functions";
import { Command } from "../structures/Command";

export default new Command({
    name: 'kick',
    description: "Kick a member from the server",
    options: [
        {
            name: 'member',
            description: "Member to kick",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    permissions: [{ name: 'kick members', perm: 'KickMembers' }],
    run: async({ interaction, args }) => {
        const member = args.getMember('member') as GuildMember;
        if (!checkPerms({ member, interaction, mod: interaction.member, checkOwner: true, checkSelfUser: true })) return;
        await interaction.deferReply();

        await member.send(kickMsgToMember(interaction.user, interaction.guild.name)).catch(() => {});
        const result = await member.kick(`Kicked by ${interaction.user.tag} ( ${interaction.user.id} )`).catch(() => {
            interaction.editReply(kickError(interaction.user, member.user)).catch(() => {});
        });

        if (result) interaction.editReply(kick(interaction.user, member.user)).catch(() => {});
    }
})