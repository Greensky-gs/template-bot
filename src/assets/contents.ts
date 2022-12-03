import { EmbedBuilder, InteractionReplyOptions, PermissionsString, User } from "discord.js";

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