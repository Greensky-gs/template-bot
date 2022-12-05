import { AmethystEvent, commandDeniedCode } from 'amethystjs';
import { getReply } from '../assets/contents';
import { systRep } from '../assets/functions';

export default new AmethystEvent('commandDenied', (command, reason) => {
    if (reason?.code === commandDeniedCode.UserMissingPerms) {
        systRep(
            command?.interaction,
            getReply('missingPerms', { ephemeral: true }, command.interaction?.user, reason.metadata.permissions.need)
        ).catch(() => {});
        return;
    }
    if (reason?.code === commandDeniedCode.ClientMissingPerms) {
        systRep(
            command?.interaction,
            getReply(
                'clientMissingPerm',
                { ephemeral: true },
                command?.interaction.user,
                reason.metadata?.permissions.need
            )
        ).catch(() => {});
    }
    if (reason?.code === commandDeniedCode.GuildOnly) {
        systRep(command.interaction, getReply('guildOnly', { ephemeral: true }, command.interaction.user));
    }
    if (reason?.code === commandDeniedCode.CustomPrecondition) {
        systRep(
            command?.interaction,
            getReply('customPrecondition', { ephemeral: true }, command.interaction.user, reason.metadata.message)
        ).catch(() => {});
    }
});
