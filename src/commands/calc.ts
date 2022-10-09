import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../structures/Command';
import { evalExpression } from '@hkh12/node-calc';

export default new Command({
    name: 'calc',
    description: 'Do a math calculation',
    dmPermission: true,
    options: [
        {
            name: 'calculation',
            description: 'Enter your calculation',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    run: ({ interaction, args }) => {}
});
