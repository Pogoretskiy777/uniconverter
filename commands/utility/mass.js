const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mass")
    .setDescription("Converts mass measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Ounce", value: "ounce" },
          { name: "Pound", value: "pound" },
          { name: "Stone", value: "stone" },
          { name: "US ton", value: "us_ton" },
          { name: "Imperial ton", value: "imperial_ton" },
          { name: "Microgram", value: "microgram" },
          { name: "Milligram", value: "milligram" },
          { name: "Gram", value: "gram" },
          { name: "Kilogram", value: "kilogram" },
          { name: "Metric ton", value: "metric_ton" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Ounce", value: "ounce" },
          { name: "Pound", value: "pound" },
          { name: "Stone", value: "stone" },
          { name: "US ton", value: "us_ton" },
          { name: "Imperial ton", value: "imperial_ton" },
          { name: "Microgram", value: "microgram" },
          { name: "Milligram", value: "milligram" },
          { name: "Gram", value: "gram" },
          { name: "Kilogram", value: "kilogram" },
          { name: "Metric ton", value: "metric_ton" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      ounce: 0.0283495,
      pound: 0.453592,
      stone: 6.35029,
      us_ton: 907.185,
      imperial_ton: 1016.05,
      microgram: 1e-9,
      milligram: 1e-6,
      gram: 0.001,
      kilogram: 1,
      metric_ton: 1000,
    };

    const unitSymbols = {
      ounce: "oz",
      pound: "lb",
      stone: "st",
      us_ton: "tn",
      imperial_ton: "lt",
      microgram: "µg",
      milligram: "mg",
      gram: "g",
      kilogram: "kg",
      metric_ton: "t",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
    });
  },
};
