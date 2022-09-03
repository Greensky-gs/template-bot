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
        .setTitle('Membre trop haut')
        .setDescription(`Ce membre est supérieur ou égal à moi dans la hiérarchie des rôles`)
        .setColor('#ff0000')
    );
}
export function modTooLow(user: User) {
    return generateData(basic(user)
        .setTitle('Membre trop haut')
        .setDescription(`Ce membre est supérieur ou égal à vous dans la hiérarchie des rôles`)
        .setColor('#ff0000')
    );
}
export function memberIsOwner(user: User, member: User) {
    return generateData(basic(user)
        .setTitle('Propriétaire du serveur')
        .setDescription(`<@${member.id}> est le propriétaire du serveur`)
        .setColor('#ff0000')
    );
}
export function memberIsBot(user: User, member: User) {
    const embed = basic(user)
        .setTitle('Bot')
        .setColor('#ff0000')
        .setDescription(
            `<@${member.id}> est un bot.\nJe ne peux pas effectuer cette action de modération sur un coupain.`
        );

    return generateData(embed);
}
export function memberIsSelfUser(user: User) {
    return generateData(basic(user)
        .setTitle('Auto-ciblage')
        .setDescription(`La personne que vous avez ciblé est vous-même`)
        .setColor('#ff0000')
    );
}
export function memberNotModerable(user: User, member: User) {
    return generateData(basic(user)
        .setTitle('Non-modérable')
        .setDescription(`<@${member.id}> n'est pas modérable.\nVérifiez mes permissions avant de réessayer la commande`)
        .setColor('#ff0000')
    );
}