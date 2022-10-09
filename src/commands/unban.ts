import { ApplicationCommandOptionType } from "discord.js";
import { unbanned, unknownBan } from "../assets/contents";
import { Command } from "../structures/Command";

export default new Command({
  name: "unban",
  description: "Unban a member from the server",
  options: [
    {
      name: "id",
      description: "User's id",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissions: [{ name: "ban members", perm: "BanMembers" }],
  run: async ({ interaction, args }) => {
    const id = args.getString("id");
    await interaction.deferReply().catch(() => {});

    const ban = (await interaction.guild.bans.fetch()).filter(
      (x) => x.user.id === id
    );

    if (ban.size === 0)
      return interaction
        .editReply(unknownBan(interaction.user, id))
        .catch(() => {});
    await interaction.guild.members.unban(ban.first().user).catch(() => {});

    interaction
      .editReply(unbanned(interaction.user, ban.first().user))
      .catch(() => {});
  },
});
