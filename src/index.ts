import { AmethystClient } from "amethystjs";
import { Partials } from "discord.js";
import { config } from "dotenv";

config();

const client = new AmethystClient({
    intents: ['Guilds', 'GuildMembers'],
    partials: [Partials.GuildMember]
}, {
    token: process.env.token,
    commandsFolder: './dist/commands',
    eventsFolder: './dist/events',
    preconditionsFolder: './dist/preconditions',
    buttonsFolder: './dist/buttons',
    debug: true
})

client.start({});

// dotenv checks
process.env.locale = process.env.locale ?? 'en';