import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Partials,
  Collection,
} from "discord.js";
import { readdirSync } from "fs";
import { CommandType } from "../typings/Command";
import { Event } from "./Event";

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  #path = __filename.endsWith(".ts") ? "src" : "dist";
  constructor() {
    super({
      intents: ["GuildMembers", "GuildMessages", "Guilds", "MessageContent"],
      partials: [Partials.User, Partials.Channel, Partials.GuildMember],
    });
  }
  start() {
    if (!process.env.token) throw "Token expected in .env file";
    if (!process.env.guild) throw "Guild exepexted in .env file";
    if (!process.env.antispam) throw "Antispam expected in .env file";

    this.login(process.env.token);
    this.loadModules();
  }
  loadModules() {
    this.loadCommands();
    this.loadEvents();
  }
  loadEvents() {
    readdirSync(`./${this.#path}/events`).forEach(async (fileName) => {
      const event: Event<keyof ClientEvents> =
        require(`../events/${fileName}`).default;

      this.on(event.event, event.run);
    });
  }
  loadCommands() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    readdirSync(`./${this.#path}/commands`).forEach(async (fileName) => {
      const file: CommandType = require(`../commands/${fileName}`).default;

      slashCommands.push(file);
      this.commands.set(file.name, file);
    });

    this.on("ready", () => {
      this.guilds.cache.get(process.env.guild)?.commands.set(slashCommands);
    });
  }
}
