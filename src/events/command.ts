import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '..';
import { missingPerms, unkownCommand } from '../assets/contents';
import { Event } from '../structures/Event';
import { ExentedInteraction } from '../typings/Command';

export default new Event('interactionCreate', (inter) => {
    const interaction = inter as ExentedInteraction;

    if (!interaction.guild || interaction.guild.id !== process.env.guild) return;

    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction
                .reply(Object.assign(unkownCommand(interaction.user), { ephemeral: true }))
                .catch(() => {});

        if (command.permissions) {
            let missing = [];
            command.permissions.forEach((perm) => {
                if (!interaction.member.permissions.has(perm.perm)) missing.push(perm);
            });

            if (missing.length > 0)
                return interaction
                    .reply(
                        Object.assign(missingPerms(interaction.user, missing), {
                            ephemeral: true
                        })
                    )
                    .catch(() => {});
        }
        command.run({
            interaction,
            args: interaction.options as CommandInteractionOptionResolver,
            client: client
        });
    }
});
