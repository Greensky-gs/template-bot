import { ExtendedClient } from '../structures/Client';
import { CommandInteraction, CommandInteractionOptionResolver, ChatInputApplicationCommandData, GuildMember, ApplicationCommandOptionData, PermissionsString } from 'discord.js';

export interface ExentedInteraction extends CommandInteraction {
    member: GuildMember;
}
interface RunOptions {
    client: ExtendedClient,
    interaction: ExentedInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;
export type permissionsArray = { name: string, perm: PermissionsString }[];

export type CommandType = {
    run: RunFunction;
    options?: ApplicationCommandOptionData[],
    permissions?: permissionsArray
} & ChatInputApplicationCommandData