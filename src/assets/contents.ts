import { Embed, EmbedBuilder, User } from "discord.js";
import { permissionsArray } from "../typings/Command";

const basic = (user: User) => {
    return new EmbedBuilder()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL({ forceStatic: false }) })
        .setTimestamp();
};

const generateData = (data: Embed | EmbedBuilder | string) => {
    if (typeof data === 'string') return { content: data };
    return { embeds: [ data ] };
};

export function join(user: User) {
    return generateData(basic(user)
        .setTitle("New member")
        .setDescription(`<@${user.id}> just joined the server !`)
        .setColor('Blurple')
        .setThumbnail(user.displayAvatarURL({ forceStatic: false, extension: 'png' }))
    )
};
export function leave(user: User) {
    return generateData(basic(user)
        .setTitle("Leave")
        .setDescription(`<@${user.id}> just leaved the server !`)
        .setColor('Blurple')
        .setThumbnail(user.displayAvatarURL({ forceStatic: false, extension: 'png' }))
    )
};
export function unkownCommand(user: User) {
    return generateData(basic(user)
        .setTitle("Unknown command")
        .setDescription(`This command doesn't exist`)
        .setColor('#ff0000')
    )
}
export function missingPerms(user: User, perms: permissionsArray) {
    return generateData(basic(user)
        .setTitle("Missing permissions")
        .setDescription(`You need some permissions to execute this command.\n\nMissing : ${perms.map(p => `\`${p.name.toLowerCase()}\``).join(', ')}`)
        .setColor('#ff0000')
    )
}
export function clientTooLow(user: User) {
    return generateData(basic(user)
        .setTitle('Member too high')
        .setDescription(`This member is too high for me in the role hierarchy.`)
        .setColor('#ff0000')
    );
}
export function modTooLow(user: User) {
    return generateData(basic(user)
        .setTitle('Member too high')
        .setDescription(`This member is too high for me in the role hierarchy`)
        .setColor('#ff0000')
    );
}
export function memberIsOwner(user: User, member: User) {
    return generateData(basic(user)
        .setTitle('Owner')
        .setDescription(`<@${member.id}> is the server owner`)
        .setColor('#ff0000')
    );
}
export function memberIsBot(user: User, member: User) {
    const embed = basic(user)
        .setTitle('Bot')
        .setColor('#ff0000')
        .setDescription(
            `<@${member.id}> is a bot.\nI cannot do this on a bot.`
        );

    return generateData(embed);
}
export function memberIsSelfUser(user: User) {
    return generateData(basic(user)
        .setTitle('Self targetting')
        .setDescription(`You're trying to moderate yourself`)
        .setColor('#ff0000')
    );
}
export function memberNotModerable(user: User, member: User) {
    return generateData(basic(user)
        .setTitle('No-moderatable')
        .setDescription(`<@${member.id}> isn't moderatable.\nPlease check my permissions before run the command again`)
        .setColor('#ff0000')
    );
}
export function ban(user: User, member: User) {
    return generateData(basic(user)
        .setTitle("Ban")
        .setDescription(`The ban hammer has spoken.`)
        .setFields(
            {
                name: 'Moderator',
                value: `<@${user.id}> ( ${user.tag} )`,
                inline: true
            },
            {
                name: 'Member',
                value: `<@${member.id}> ( ${member.tag} )`,
                inline: true
            }
        )
        .setColor('#ff0000')
    )
}
export function banMsgToMember(user: User, guildName: string) {
    return generateData(basic(user)
        .setTitle("Ban")
        .setDescription(`You've been banned from ${guildName} by ${user.tag} ( <@${user.id}> \`${user.id}\` )`)
        .setColor('#ff0000')
    )
};
export function banError(user: User, member: User) {
    return generateData(basic(user)
        .setTitle("Error")
        .setDescription(`I've encountered an error while banning <@${member.id}>`)
        .setColor('#ff0000')
    )
}
export function kick(user: User, member: User) {
    return generateData(basic(user)
        .setTitle("Kick")
        .setDescription(`Someone has been kicked from the server.`)
        .setFields(
            {
                name: 'Moderator',
                value: `<@${user.id}> ( ${user.tag} )`,
                inline: true
            },
            {
                name: 'Member',
                value: `<@${member.id}> ( ${member.tag} )`,
                inline: true
            }
        )
        .setColor('#ff0000')
    )
}
export function kickMsgToMember(user: User, guildName: string) {
    return generateData(basic(user)
        .setTitle("Kick")
        .setDescription(`You've been kicked from ${guildName} by ${user.tag} ( <@${user.id}> \`${user.id}\` )`)
        .setColor('#ff0000')
    )
};
export function kickError(user: User, member: User) {
    return generateData(basic(user)
        .setTitle("Error")
        .setDescription(`I've encountered an error while kicking <@${member.id}>`)
        .setColor('#ff0000')
    )
}
export function mute(user: User, member: User, time: number) {
    return generateData(basic(user)
        .setTitle("Mute")
        .setDescription(`A member has been muted.`)
        .setFields(
            {
                name: 'Moderator',
                value: `<@${user.id}> ( ${user.tag} )`,
                inline: true
            },
            {
                name: 'Member',
                value: `<@${member.id}> ( ${member.tag} )`,
                inline: true
            },
            {
                name: 'Duration',
                value: `Unmuted <t:${((time + Date.now()) / 1000).toFixed(0)}:R>`,
                inline: true
            }
        )
        .setColor('#ff0000')
    )
}
export function muteMsgToMember(user: User, guildName: string, time: number) {
    return generateData(basic(user)
        .setTitle("Ban")
        .setDescription(`You've been banned from ${guildName} by ${user.tag} ( <@${user.id}> \`${user.id}\` ).\nYou'll be unmuted <t:${((time + Date.now()) / 1000).toFixed(0)}:R>`)
        .setColor('#ff0000')
    )
};
export function muteError(user: User, member: User) {
    return generateData(basic(user)
        .setTitle("Error")
        .setDescription(`I've encountered an error while muting <@${member.id}>`)
        .setColor('#ff0000')
    )
}