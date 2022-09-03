import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { mute, muteError, muteMsgToMember } from "../assets/contents";
import { checkPerms } from "../assets/functions";
import { Command } from "../structures/Command";

export default new Command({
    name: 'mute',
    description: "Mute a member for a given time",
    options: [
        {
            name: 'member',
            description: "Member to mute",
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: 'time',
            description: "Duration of the mute",
            required: true,
            type: ApplicationCommandOptionType.Number,
            choices: [
                {
                    name: '1 minute',
                    value: 60
                },
                {
                    name: '5 minutes',
                    value: 60 * 5
                },
                {
                    name: '10 minutes',
                    value: 600
                },
                {
                    name: '30 minutes',
                    value: 18000
                },
                {
                    name: '1 hour',
                    value: 60*60
                },
                {
                    name: '2 hours',
                    value: 60*120
                },
                {
                    name: '3 hours',
                    value: 60*60*3
                },
                {
                    name: '6 hours',
                    value: 60*60*6
                },
                {
                    name: '12 hours',
                    value: 60*60*12
                },
                {
                    name: '1 day',
                    value: 60*60*24
                }
            ]
        },
        {
            name: 'reason',
            type: ApplicationCommandOptionType.String,
            required: true,
            description: "Reason for the mute"
        }
    ],
    run: async({ interaction, args }) => {
        const member = args.get('member', true).member as GuildMember;
        const time = args.getNumber('time') * 1000;
        const reason = args.getString('reason');

        if (!checkPerms({ interaction, member, mod: interaction.member, checkBot: true, checkOwner: true, checkSelfUser: true })) return;

        await interaction.deferReply();
        await member.send(muteMsgToMember(interaction.user, interaction.guild.name, time)).catch(() => {});
        const result = await member.timeout(time, reason).catch(() => {
            interaction.editReply(muteError(interaction.user, member.user)).catch(() => {});
        });
        if (result) interaction.editReply(mute(interaction.user, member.user, time)).catch(() => {});
    }
})