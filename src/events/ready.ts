import { ActivityType } from "discord.js";
import { Event } from "../structures/Event";

export default new Event('ready', (client) => {
    client.user.setActivity({
        name: 'made by Greensky',
        type: ActivityType.Streaming,
        url: 'https://github.com/Greensky-gs/template-bot'
    });
})