import { ButtonBuilder, ComponentType, GuildMember, InteractionReplyOptions, Message } from 'discord.js';
import { adminList, cancelBtn, toActionRow } from '../assets/components';
import { adminListQuestion, cancel, adminList as embed } from '../assets/contents';
import { waitForInteraction } from '../assets/waitFor';
import { Command } from '../structures/Command';

export default new Command({
    name: 'adminlist',
    description: 'Display the admin list',
    run: async ({ interaction }) => {
        const row = toActionRow<ButtonBuilder>([adminList.humans, adminList.bots, adminList.all, cancelBtn]);

        const replyData: InteractionReplyOptions = adminListQuestion(interaction.user);
        replyData.fetchReply = true;
        replyData.components = [row];

        const reply = (await interaction.reply(replyData)) as unknown as Message<true>;
        const choice = await waitForInteraction({
            message: reply,
            user: interaction.user,
            component_type: ComponentType.Button
        });

        if (!choice || choice.customId === 'cancel')
            return interaction.editReply(Object.assign(cancel(), { components: [] })).catch(() => {});
        interaction.editReply({ components: [] }).catch(() => {});

        const filter = (x: GuildMember) => {
            if (choice.customId === 'bots') {
                return x.user.bot;
            }
            if (choice.customId === 'humans') {
                return !x.user.bot;
            }
            return true;
        };

        await interaction.guild.members.fetch();
        const admins = interaction.guild.members.cache.filter(filter);

        interaction.editReply(embed(interaction.user, admins)).catch(() => {});
    }
});
