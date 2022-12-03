import { EmbedBuilder, InteractionReplyOptions } from "discord.js";

const generateData = (content: string | EmbedBuilder): InteractionReplyOptions => {
    if (typeof content === 'string') return { content };
    return {
        embeds: [ content ]
    };
}

const replies = {
    
} as const;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export const getReply = <T extends keyof typeof replies>(x: T, options: InteractionReplyOptions, ...args: ArgumentTypes<typeof replies[T]>): InteractionReplyOptions => {
    const rep: InteractionReplyOptions = (replies[x] as Function)(args);
    if (Object.keys(options).length > 0) {
        Object.assign(rep, options);
    }

    return rep;
}