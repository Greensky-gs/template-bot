import { guildBans, noBans } from '../assets/contents';
import { Command } from '../structures/Command';

export default new Command({
    name: 'banlist',
    description: 'Display all banned members from the server',
    permissions: [{ name: 'view audit logs', perm: 'ViewAuditLog' }],
    run: async ({ interaction }) => {
        await interaction.deferReply().catch(() => {});
        const bans = await interaction.guild.bans.fetch();

        if (!bans || (bans && bans.size === 0)) return interaction.editReply(noBans(interaction.user)).catch(() => {});
        interaction.editReply(guildBans(interaction.user, bans)).catch(() => {});
    }
});
