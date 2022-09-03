import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { checkPerms } from "../assets/functions";
import { Command } from "../structures/Command";

export default new Command({
    name: 'ban',
    description: "Ban a member from the server",
    options: [
        {
            name: 'member',
            description: "Member to ban",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: ({ interaction, args }) => {
        const member = args.getMember('member');
        if (!checkPerms({ interaction, mod: interaction.member, member: member as GuildMember }))
    }
})