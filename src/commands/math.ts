import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../structures/Command';
import { evalExpression } from '@hkh12/node-calc';
import { invalidCalc, calc as calcEmbed } from '../assets/contents';

export default new Command({
    name: 'maths',
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
    run: async ({ interaction, args }) => {
        const calc = args.getString('calculation');
        new Promise((resolve) => {
            resolve(evalExpression(calc));
        })
        .catch(() => {})
        .then(async (result: any) => {
                if (!result) return interaction.reply(invalidCalc(interaction.user)).catch(() => {});

                interaction.reply(calcEmbed(interaction.user, calc, result as any)).catch(() => {});
            });
    }
});
