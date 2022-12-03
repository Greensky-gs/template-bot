import { AmethystEvent, commandDeniedCode } from "amethystjs";
import { getReply } from "../assets/contents";
import { systRep } from "../assets/functions";

export default new AmethystEvent('commandDenied', (command, reason) => {
    if (reason?.code === commandDeniedCode.UserMissingPerms) {
        systRep(command?.interaction, getReply('missingPerms', {}, command.interaction?.user, reason.metadata.permissions.need)).catch(() => {});
        return;
    }
    if (reason?.code === commandDeniedCode.CustomPrecondition) {
        systRep(command?.interaction, getReply('customPrecondition', {}, command.interaction.user, reason.metadata.message)).catch(() => {});
    }
})