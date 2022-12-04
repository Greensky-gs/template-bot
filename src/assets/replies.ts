import { EmbedBuilder, InteractionReplyOptions, User, PermissionsString, Guild, GuildMember } from "discord.js";
import { userName, dateNow, capitalize } from "./functions";

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

type modOptions = {
    guild: Guild;
    mod: User;
    member: User;
    reason: string;
};

const modEmbed = ({ mod, member, reason, type, typed, insertMemberField = true }: modOptions & { type: string; typed: string; insertMemberField?: boolean }) => {
    const x = new EmbedBuilder()
        .setTimestamp()
        .setTitle(capitalize(type))
        .setDescription(`A member has been ${typed}`)
        .setColor('#ff0000')
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
    
    if (insertMemberField) x.setFields({
        name: 'Member',
        value: userName(member),
        inline: true
    }, ...x.data.fields)
    return x;
}

export const replies = {
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
    kickInChat: (opts: modOptions) => {
        return generateData(modEmbed({
            ...opts,
            type: 'kick',
            typed: 'kicked'
        }));
    },
    kickToUser: (opts: modOptions) => {
        return generateData(modEmbed({
            ...opts,
            type: 'kick',
            typed: 'kicked',
            insertMemberField: false
        }).setDescription(`You've been kicked from ${opts.guild.name}`))
    },
    notKickable: (user: User, member: GuildMember) => {
        return generateData(new EmbedBuilder()
            .setTitle("Member not kickable")
            .setDescription(`<@${member.id}> isn't kickable`)
            .setColor('#ff0000')
        , ':x:')
    },
    notBannable: (user: User, member: GuildMember) => {
        return generateData(new EmbedBuilder()
            .setTitle("Member not bannable")
            .setDescription(`<@${member.id}> isn't bannable`)
            .setColor('#ff0000')
        , ':x:')
    },
    banInChat: (opts: modOptions) => {
        return generateData(modEmbed({
            ...opts,
            type: 'ban',
            typed: 'banned'
        }));
    },
    banToUser: (opts: modOptions) => {
        return generateData(modEmbed({
            ...opts,
            type: 'ban',
            typed: 'banned',
            insertMemberField: false
        }).setDescription(`You've been banned from <@${opts.guild.name}>`))
    }
} as const;