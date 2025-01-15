const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("length")
    .setDescription("Converts length measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Inch", value: "inch" },
          { name: "Foot", value: "foot" },
          { name: "Yard", value: "yard" },
          { name: "Mile", value: "mile" },
          { name: "Nanometer", value: "nanometer" },
          { name: "Micrometer", value: "micrometer" },
          { name: "Millimeter", value: "millimeter" },
          { name: "Centimeter", value: "centimeter" },
          { name: "Meter", value: "meter" },
          { name: "Kilometer", value: "kilometer" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Inch", value: "inch" },
          { name: "Foot", value: "foot" },
          { name: "Yard", value: "yard" },
          { name: "Mile", value: "mile" },
          { name: "Nanometer", value: "nanometer" },
          { name: "Micrometer", value: "micrometer" },
          { name: "Millimeter", value: "millimeter" },
          { name: "Centimeter", value: "centimeter" },
          { name: "Meter", value: "meter" },
          { name: "Kilometer", value: "kilometer" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const conversionRates = {
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
      nanometer: 1e-9,
      micrometer: 1e-6,
      millimeter: 0.001,
      centimeter: 0.01,
      meter: 1,
      kilometer: 1000,
    };

    const unitSymbols = {
      inch: "in",
      foot: "ft",
      yard: "yd",
      mile: "mi",
      nanometer: "nm",
      micrometer: "µm",
      millimeter: "mm",
      centimeter: "cm",
      meter: "m",
      kilometer: "km",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
    });
  },
};
