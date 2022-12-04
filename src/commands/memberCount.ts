import { AmethystCommand, preconditions } from "amethystjs";
import { commandData, getReply } from "../assets/contents";

export default new AmethystCommand({
    name: commandData('membercount').name,
    description: commandData('membercount').description,
    preconditions: [preconditions.GuildOnly]
}).setChatInputRun(async({ interaction }) => {
    await interaction.reply(getReply('memberCount', {}, { all: interaction.guild.memberCount })).catch(() => {});

    await interaction.guild.members.fetch();
    const members = interaction.guild.members.cache;

    interaction.editReply(getReply('memberCount', {}, {
        all: members.size,
        bots: members.filter(x => x.user.bot).size,
        humans: members.filter(x => !x.user.bot).size
    })).catch(() => {});
})