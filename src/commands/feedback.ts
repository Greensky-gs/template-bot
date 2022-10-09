import { ActionRowBuilder } from "@discordjs/builders";
import {
  ChannelType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { feedbackNotEnabled } from "../assets/contents";
import { Command } from "../structures/Command";

export default new Command({
  name: "feedback",
  description: "Leave your feedback of the server",
  run: async ({ interaction }) => {
    const channel = await interaction.guild.channels.fetch(
      process.env.feedbackChannel
    );

    if (!channel || channel.type !== ChannelType.GuildText)
      return interaction
        .editReply(feedbackNotEnabled(interaction.user))
        .catch(() => {});

    const modal = new ModalBuilder()
      .setTitle("Server review")
      .setCustomId("feedback")
      .setComponents(
        new ActionRowBuilder().setComponents(
          new TextInputBuilder()
            .setCustomId("feedback-value")
            .setRequired(true)
            .setLabel("Feedback")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(50)
            .setMaxLength(2500)
        ) as ActionRowBuilder<TextInputBuilder>
      );

    interaction.showModal(modal);
  },
});
