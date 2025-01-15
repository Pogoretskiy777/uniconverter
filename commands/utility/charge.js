const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("charge")
    .setDescription("Converts electrical charge measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Coulomb", value: "coulomb" },
          { name: "Millicoulomb", value: "millicoulomb" },
          { name: "Microcoulomb", value: "microcoulomb" },
          { name: "Electron charge", value: "electron_charge" },
          { name: "Faraday", value: "faraday" },
          { name: "Ampere-hour", value: "ampere_hour" },
          { name: "Milliampere-hour", value: "milliampere_hour" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Coulomb", value: "coulomb" },
          { name: "Millicoulomb", value: "millicoulomb" },
          { name: "Microcoulomb", value: "microcoulomb" },
          { name: "Electron charge", value: "electron_charge" },
          { name: "Faraday", value: "faraday" },
          { name: "Ampere-hour", value: "ampere_hour" },
          { name: "Milliampere-hour", value: "milliampere_hour" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      coulomb: 1,
      millicoulomb: 0.001,
      microcoulomb: 0.000001,
      electron_charge: 1.602176634e-19,
      faraday: 96485.33212,
      ampere_hour: 3600,
      milliampere_hour: 3.6,
    };

    const unitSymbols = {
      coulomb: "C",
      millicoulomb: "mC",
      microcoulomb: "µC",
      electron_charge: "e",
      faraday: "F",
      ampere_hour: "Ah",
      milliampere_hour: "mAh",
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
