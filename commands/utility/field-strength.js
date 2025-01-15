const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("field-strength")
    .setDescription("Converts magnetic field strength measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Ampere/meter", value: "ampere_meter" },
          { name: "Ampere turn/meter", value: "ampere_turn_meter" },
          { name: "Kiloampere/meter", value: "kiloampere_meter" },
          { name: "Oersted", value: "oersted" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Ampere/meter", value: "ampere_meter" },
          { name: "Ampere turn/meter", value: "ampere_turn_meter" },
          { name: "Kiloampere/meter", value: "kiloampere_meter" },
          { name: "Oersted", value: "oersted" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      ampere_meter: 1,
      ampere_turn_meter: 1,
      kiloampere_meter: 1000,
      oersted: 79.5774715459,
    };

    const unitSymbols = {
      ampere_meter: "A/m",
      ampere_turn_meter: "At/m",
      kiloampere_meter: "kA/m",
      oersted: "Oe",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue =
      convertedValue < 0.00001
        ? convertedValue.toExponential(5)
        : Math.round(convertedValue * 100000) / 100000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
    });
  },
};
