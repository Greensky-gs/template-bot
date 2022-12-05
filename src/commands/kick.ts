import { AmethystCommand, preconditions } from 'amethystjs';
import { ApplicationCommandOptionType, GuildMember, MessageCreateOptions } from 'discord.js';
import { commandData, getReply } from '../assets/contents';
import memberModeratable from '../preconditions/memberModeratable';

export default new AmethystCommand({
    name: commandData('kick').name,
    description: commandData('kick').description,
    options: [
        {
            name: commandData('kick').options.member.name,
            description: commandData('kick').options.member.description,
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: commandData('kick').options.reason.name,
            description: commandData('kick').options.reason.description,
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    preconditions: [preconditions.GuildOnly, memberModeratable],
    permissions: ['KickMembers'],
    clientPermissions: ['KickMembers']
}).setChatInputRun(async ({ interaction, options }) => {
    const member = options.getMember(commandData('kick').options.member.name) as GuildMember;
    const reason = options.getString(commandData('kick').options.reason.name);

    if (!member.kickable) return interaction.reply(getReply('notKickable', {}, interaction.user, member));
    await interaction.deferReply();

    await member
        .send(
            getReply(
                'kickToUser',
                {},
                {
                    member: member.user,
                    reason,
                    guild: member.guild,
                    mod: interaction.user
                }
            ) as MessageCreateOptions
        )
        .catch(() => {});
    await member.kick(reason).catch(() => {});

    interaction
        .editReply(
            getReply(
                'kickInChat',
                {},
                {
                    reason,
                    member: member.user,
                    mod: interaction.user,
                    guild: member.guild
                }
            )
        )
        .catch(() => {});
});
