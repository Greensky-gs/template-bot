import { AmethystCommand, preconditions } from "amethystjs";
import { commandData, getReply } from "../assets/contents";

export default new AmethystCommand({
    name: commandData('banlist').name,
    description: commandData('banlist').description,
    preconditions: [preconditions.GuildOnly],
    permissions: ['ManageGuild']
}).setChatInputRun(async({ interaction }) => {
    await Promise.all([ interaction.deferReply(), interaction.guild.bans.fetch() ]);

    interaction.editReply(getReply('banlist', {}, interaction.user, interaction.guild.bans.cache.toJSON())).catch(() => {});
})