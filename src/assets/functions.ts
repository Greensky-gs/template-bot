import { GuildMember, InteractionReplyOptions } from 'discord.js';
import { ExentedInteraction } from '../typings/Command';
import {
    clientTooLow,
    modTooLow,
    memberIsBot,
    memberIsOwner,
    memberIsSelfUser,
    memberNotModerable
} from '../assets/contents';

type checkPermsOptions = {
    interaction: ExentedInteraction;
    mod: GuildMember;
    member: GuildMember;
    checkBot?: boolean;
    checkOwner?: boolean;
    checkSelfUser?: boolean;
};

export function checkPerms(data: checkPermsOptions) {
    const memberOwner = data.member.id === data.member.guild.ownerId;
    const modIsOwner = data.mod.id === data.mod.guild.ownerId;
    const memberPosition = data.member.roles.highest.position;
    const clientPosition = data.member.guild.members.me?.roles.highest.position;
    const modPosition = data.mod.roles.highest.position;

    const reply = (params: InteractionReplyOptions) => {
        if (data.interaction.replied) {
            data.interaction.editReply(Object.assign(params, { content: '', components: [] })).catch(() => {});
        } else {
            data.interaction.reply(params).catch(() => {});
        }
    };

    if (clientPosition ?? 0 <= memberPosition) {
        reply(clientTooLow(data.mod.user));
        return false;
    }
    if (!modIsOwner && modPosition <= memberPosition) {
        reply(modTooLow(data.mod.user));
        return false;
    }
    if (!data.member.moderatable) {
        reply(memberNotModerable(data.mod.user, data.member.user));
        return false;
    }
    if (data.checkBot === true && data.member.user.bot) {
        reply(memberIsBot(data.mod.user, data.member.user));
        return false;
    }
    if (data.checkSelfUser === true && data.member.id === data.mod.id) {
        reply(memberIsSelfUser(data.mod.user));
        return false;
    }
    if (data.checkOwner === true && memberOwner) {
        reply(memberIsOwner(data.mod.user, data.member.user));
        return false;
    }
    return true;
}
