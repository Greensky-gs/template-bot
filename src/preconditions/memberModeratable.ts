import { Precondition } from "amethystjs";
import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { preconditionData } from "../assets/contents";

export default new Precondition('memberModeratable')
    .setChatInputRun(({ interaction, options }) => {
        const obj = (msg: string) => {
            return {
                ok: false,
                metadata: {
                    message: msg
                },
                isChatInput: true,
                interaction
            }
        }
        const member = options.getMember(options.data.filter(x => x.type === ApplicationCommandOptionType.User)[0]?.name) as GuildMember;

        if (!member) return obj(preconditionData('memberModerable').userNotFound);
        if (member.id === member.guild.ownerId) return obj(preconditionData('memberModerable').owner)
        if (member.roles.highest.position >= member.guild.members.me.roles.highest.position) return obj(preconditionData('memberModerable').userTooHighBot);
        if (!member.moderatable) return obj(preconditionData('memberModerable').notModeratable);

        if (interaction.user.id === member.guild.ownerId) return { ok: true, isChatInput: true, interaction };
        if (member.roles.highest.position >= (interaction.member as GuildMember).roles.highest.position) return obj(preconditionData('memberModerable').userTooHighMod);

        return {
            ok: true,
            isChatInput: true,
            interaction
        };
    });