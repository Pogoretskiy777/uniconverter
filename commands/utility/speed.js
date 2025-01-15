const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("speed")
    .setDescription("Converts speed measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Mile per hour", value: "mph" },
          { name: "Kilometer per hour", value: "kph" },
          { name: "Meter per second", value: "mps" },
          { name: "Foot per second", value: "fps" },
          { name: "Knots", value: "knots" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Mile per hour", value: "mph" },
          { name: "Kilometer per hour", value: "kph" },
          { name: "Meter per second", value: "mps" },
          { name: "Foot per second", value: "fps" },
          { name: "Knots", value: "knots" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      mph: 0.44704,
      kph: 0.277778,
      mps: 1,
      fps: 0.3048,
      knots: 0.514444,
    };

    const unitSymbols = {
      mph: "mph",
      kph: "kph",
      mps: "m/s",
      fps: "ft/s",
      knots: "kn",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
    });
  },
};
