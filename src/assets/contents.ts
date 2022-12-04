import { EmbedBuilder, Guild, GuildMember, InteractionReplyOptions, PermissionsString, User } from "discord.js";

const generateData = (content: string | EmbedBuilder, emoji?: string): InteractionReplyOptions => {
    const addEmoji = () => {
        if (emoji) {
            if (typeof content === 'string') return `${emoji} | ${content}`;
            content.setTitle(`${emoji} | ${content.data.title}`);
            return content;
        }
        return content;
    }
    if (typeof content === 'string') return { content: addEmoji() as string };
    return {
        embeds: [ addEmoji() as EmbedBuilder ]
    };
}

const replies = {
    missingPerms: (user: User, permissions: PermissionsString[]) => {
        return generateData(`You need ${permissions.length} permissions to execute this command.`, ':x:')
    },
    customPrecondition: (user: User, text: string) => {
        return generateData(text, ':x:');
    },
    clientMissingPerm: (user: User, permissions: PermissionsString[]) => {
        return generateData(`I need ${permissions.length} permissions to execute this command`, ':x:');
    },
    guildOnly: (user: User) => {
        return generateData('This command is only executable in a server', ':x:');
    },
    kickInChat: (user: User, mod: User, reason: string) => {
        return generateData(new EmbedBuilder()
            .setTitle("Kick")
            .setDescription(`A member has been kicked`)
            .setFields(
                {
                    name: 'Member',
                    value: userName(user),
                    inline: true
                },
                {
                    name: 'Moderator',
                    value: userName(mod),
                    inline: true
                },
                {
                    name: 'Date',
                    value: dateNow(),
                    inline: true
                },
                {
                    name: 'Reason',
                    value: reason,
                    inline: false
                }
            )
            .setColor('#ff0000')
            .setThumbnail(mod.displayAvatarURL({ forceStatic: true }))
            .setTimestamp()
        )
    },
    kickToUser: (user: User, mod: User, reason: string, guild: Guild) => {
        return generateData(new EmbedBuilder()
            .setTitle("Kick")
            .setDescription(`You've been kicked from ${guild.name}`)
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(mod.displayAvatarURL({ forceStatic: true }))
            .setFields(
                {
                    name: 'Moderator',
                    value: userName(mod),
                    inline: true
                },
                {
                    name: 'Date',
                    value: dateNow(),
                    inline: true
                },
                {
                    name: 'Reason',
                    value: reason,
                    inline: false
                }
            )
        )
    },
    notKickable: (user: User, member: GuildMember) => {
        return generateData(new EmbedBuilder()
            .setTitle("Member not kickable")
            .setDescription(`<@${member.id}> isn't kickable`)
            .setColor('#ff0000')
        , ':x:')
    }
} as const;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export const getReply = <T extends keyof typeof replies>(x: T, options: InteractionReplyOptions, ...args: ArgumentTypes<typeof replies[T]>): InteractionReplyOptions => {
    const rep: InteractionReplyOptions = (replies[x] as Function)(args);
    if (Object.keys(options).length > 0) {
        Object.assign(rep, options);
    }

    return rep;
}

import commandDatas from './commandDatas.json';
import { dateNow, userName } from "./functions";

export const commandData = <T extends keyof typeof commandDatas.commands>(x: T): typeof commandDatas.commands[T] => {
    return commandDatas.commands[x];
}
export const preconditionData = <T extends keyof typeof commandDatas.preconditions>(x: T): typeof commandDatas.preconditions[T] => {
    return commandDatas.preconditions[x];
}