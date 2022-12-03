import { CommandInteraction, InteractionReplyOptions } from "discord.js";

export const systRep = (interaction: CommandInteraction, reply: InteractionReplyOptions) => {
    const fnt = (interaction.replied || interaction.deferred) ? 'editReply' : 'reply';
    return interaction[fnt](reply);
}