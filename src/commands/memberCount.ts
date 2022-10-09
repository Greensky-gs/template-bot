import { memberCount } from '../assets/contents';
import { Command } from '../structures/Command';

export default new Command({
    name: 'membercount',
    description: 'Displays the member count of the server',
    run: async ({ interaction }) => {
        await interaction.deferReply();
        await interaction.guild.members.fetch();
        const members = interaction.guild.members.cache;
        const bots = members.filter((x) => x.user.bot).size;
        const humans = members.filter((x) => !x.user.bot).size;

        interaction.editReply(memberCount(interaction.user, { bots, humans })).catch(() => {});
    }
});
