import { ButtonBuilder, ComponentType, Message } from 'discord.js';
import { reflexBtn, toActionRow, waitReflexBtn } from '../assets/components';
import { reflex, cancel } from '../assets/contents';
import { wait } from '../assets/wait';
import { waitForInteraction } from '../assets/waitFor';
import { Command } from '../structures/Command';

export default new Command({
    name: 'reflex',
    description: 'Test your reflex',
    run: async ({ interaction }) => {
        const reply = (await interaction.reply(
            Object.assign(reflex(interaction.user), {
                fetchReply: true,
                components: [toActionRow<ButtonBuilder>([waitReflexBtn])]
            })
        )) as unknown as Message<true>;
        await wait(Math.floor(5000) + 2000);

        await interaction.editReply(
            Object.assign(reflex(interaction.user, 'start'), {
                components: [toActionRow<ButtonBuilder>([reflexBtn])]
            })
        );
        const started = Date.now();
        const clicked = await waitForInteraction({
            user: interaction.user,
            idle: 10000,
            component_type: ComponentType.Button,
            message: reply
        });
        const ended = Date.now();
        if (!clicked) return interaction.editReply(Object.assign(cancel(), { components: [] }));

        const ms = ended - started;

        interaction.editReply({ components: [] });
        interaction.followUp(reflex(interaction.user, ms)).catch(() => {});
    }
});
