const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resistance")
    .setDescription("Converts electrical resistance measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Ohm", value: "ohm" },
          { name: "Milliohm", value: "milliohm" },
          { name: "Microohm", value: "microohm" },
          { name: "Nanoohm", value: "nanoohm" },
          { name: "Kiloohm", value: "kiloohm" },
          { name: "Megohm", value: "megohm" },
          { name: "Statohm", value: "statohm" },
          { name: "Quantized Hall Resistance", value: "quantized_hall_resistance" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Ohm", value: "ohm" },
          { name: "Milliohm", value: "milliohm" },
          { name: "Microohm", value: "microohm" },
          { name: "Nanoohm", value: "nanoohm" },
          { name: "Kiloohm", value: "kiloohm" },
          { name: "Megohm", value: "megohm" },
          { name: "Statohm", value: "statohm" },
          { name: "Quantized Hall Resistance", value: "quantized_hall_resistance" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      ohm: 1,
      milliohm: 0.001,
      microohm: 0.000001,
      nanoohm: 0.000000001,
      kiloohm: 1000,
      megohm: 1000000,
      statohm: 8.9875517873681764e11,
      quantized_hall_resistance: 25812.807,
    };

    const unitSymbols = {
      ohm: "Ω",
      milliohm: "mΩ",
      microohm: "µΩ",
      nanoohm: "nΩ",
      kiloohm: "kΩ",
      megohm: "MΩ",
      statohm: "statΩ",
      quantized_hall_resistance: "QHR",
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
