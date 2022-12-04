import { InteractionReplyOptions } from "discord.js";

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export const getReply = <T extends keyof typeof replies>(x: T, options: InteractionReplyOptions, ...args: ArgumentTypes<typeof replies[T]>): InteractionReplyOptions => {
    const rep: InteractionReplyOptions = (replies[x] as Function)(...args);
    if (Object.keys(options).length > 0) {
        Object.assign(rep, options);
    }

    return rep;
}

import commandDatas from './commandDatas.json';
import contents from './contents.json';
import { replies } from "./replies";

export const commandData = <T extends keyof typeof commandDatas.commands>(x: T): typeof commandDatas.commands[T] => {
    return commandDatas.commands[x];
}
export const preconditionData = <T extends keyof typeof commandDatas.preconditions>(x: T): typeof commandDatas.preconditions[T] => {
    return commandDatas.preconditions[x];
}
export const getVar = <T extends keyof typeof contents, U extends keyof typeof contents[T]>(x: T, y: U, value: string) => {
    const cnt = (contents[x][y] as string).replace(/\{+.\}/g, value);
    return cnt;
}