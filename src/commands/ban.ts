import { AmethystCommand, preconditions } from "amethystjs";
import { ApplicationCommandOptionType, GuildMember, MessageCreateOptions } from "discord.js";
import { commandData, getReply } from "../assets/contents";
import memberModeratable from "../preconditions/memberModeratable";

export default new AmethystCommand({
    name: commandData('ban').name,
    description: commandData('ban').description,
    options: [
        {
            name: commandData('ban').options.member.name,
            description: commandData('ban').options.member.description,
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: commandData('ban').options.reason.name,
            description: commandData('ban').options.reason.description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    preconditions: [preconditions.GuildOnly, memberModeratable],
    permissions: ['BanMembers'],
    clientPermissions: ['BanMembers']
})
.setChatInputRun(async({ interaction, options }) => {
    const member = options.getMember(commandData('ban').options.member.name) as GuildMember;
    const reason = options.getString(commandData('ban').options.reason.name);

    if (!member.bannable) return interaction.reply(getReply('notBannable', {}, interaction.user, member)).catch(() => {});

    await member.send(getReply('banToUser', {}, {
        guild: member.guild,
        reason,
        member: member.user,
        mod: interaction.user
    }) as MessageCreateOptions).catch(() => {});
    await member.ban({
        reason,
        deleteMessageSeconds: 604800
    }).catch(() => {});

    interaction.editReply(getReply('banInChat', {}, {
        guild: member.guild,
        reason,
        member: member.user,
        mod: interaction.user
    })).catch(() => {});
})