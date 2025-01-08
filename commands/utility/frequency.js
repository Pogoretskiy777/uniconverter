const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("frequency")
    .setDescription("Converts frequency measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Hertz", value: "hz" },
          { name: "Kilohertz", value: "khz" },
          { name: "Megahertz", value: "mhz" },
          { name: "Gigahertz", value: "ghz" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Hertz", value: "hz" },
          { name: "Kilohertz", value: "khz" },
          { name: "Megahertz", value: "mhz" },
          { name: "Gigahertz", value: "ghz" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      hz: 1,
      khz: 1000,
      mhz: 1000000,
      ghz: 1000000000,
    };

    const unitSymbols = {
      hz: "Hz",
      khz: "kHz",
      mhz: "MHz",
      ghz: "GHz",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 100000) / 100000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
