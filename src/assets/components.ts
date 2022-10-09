import {
  ActionRowBuilder,
  AnyComponentBuilder,
  APIBaseComponent,
  ButtonBuilder,
  ButtonStyle,
  ComponentBuilder,
  ComponentType,
  TextInputBuilder,
} from "discord.js";

export const adminList = {
  bots: new ButtonBuilder({
    label: "Bots",
    style: ButtonStyle.Primary,
    customId: "bots",
  }),
  humans: new ButtonBuilder({
    label: "Humans",
    style: ButtonStyle.Primary,
    customId: "humans",
  }),
  all: new ButtonBuilder({
    label: "All",
    style: ButtonStyle.Secondary,
    customId: "all",
  }),
};
export const cancelBtn = new ButtonBuilder({
  label: "Cancel",
  style: ButtonStyle.Danger,
  customId: "cancel",
});
export const toActionRow = <T extends AnyComponentBuilder>(
  components: AnyComponentBuilder[]
): ActionRowBuilder<T> => {
  const row = new ActionRowBuilder().addComponents(
    components
  ) as ActionRowBuilder<T>;

  return row;
};
export const reflexBtn = new ButtonBuilder({
  label: "Click !",
  style: ButtonStyle.Danger,
  customId: "reflexBtn",
});
export const waitReflexBtn = new ButtonBuilder({
  label: "wait...",
  style: ButtonStyle.Secondary,
  customId: "reflexBtn",
  disabled: true,
});
