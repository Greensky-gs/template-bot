import { GuildTextBasedChannel, ModalSubmitInteraction } from 'discord.js';
import { deferFeedback, feedback } from '../assets/contents';
import { Event } from '../structures/Event';

export default new Event('interactionCreate', async (interaction: ModalSubmitInteraction) => {
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'feedback') {
            await interaction.deferReply({ ephemeral: true });

            const review = interaction.fields.getTextInputValue('feedback-value');
            const channel = interaction.guild.channels.cache.get(process.env.feedbackChannel) as GuildTextBasedChannel;

            await channel.send(feedback(interaction.user, review)).catch(() => {});
            await interaction.editReply(deferFeedback(interaction.user)).catch(() => {});
        }
    }
});
