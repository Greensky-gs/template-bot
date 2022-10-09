import { ChannelType } from "discord.js";
import { leave } from "../assets/contents";
import { Event } from "../structures/Event";

export default new Event("guildMemberRemove", (member) => {
  if (member.guild.id !== process.env.guild) return;
  const channel = member.guild.channels.cache.get(
    process.env.leaveChannel ?? ""
  );

  if (channel && channel.type === ChannelType.GuildText) {
    const data = leave(member.user);
    channel.send(data).catch(() => {});
  }
});
