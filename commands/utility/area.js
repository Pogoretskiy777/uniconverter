const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("area")
    .setDescription("Converts area measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Square Kilometer", value: "sqkm" },
          { name: "Square Mile", value: "sqmi" },
          { name: "Square Meter", value: "sqm" },
          { name: "Square Yard", value: "sqyd" },
          { name: "Square Foot", value: "sqft" },
          { name: "Square Inch", value: "sqin" },
          { name: "Acre", value: "acre" },
          { name: "Hectare", value: "hectare" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Square Kilometer", value: "sqkm" },
          { name: "Square Mile", value: "sqmi" },
          { name: "Square Meter", value: "sqm" },
          { name: "Square Yard", value: "sqyd" },
          { name: "Square Foot", value: "sqft" },
          { name: "Square Inch", value: "sqin" },
          { name: "Acre", value: "acre" },
          { name: "Hectare", value: "hectare" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      sqkm: 1,
      sqmi: 2.58999,
      sqm: 1e6,
      sqyd: 1.19599e6,
      sqft: 1.07639e7,
      sqin: 1.55e9,
      acre: 247.105,
      hectare: 100,
    };

    const unitSymbols = {
      sqkm: "km²",
      sqmi: "mi²",
      sqm: "m²",
      sqyd: "yd²",
      sqft: "ft²",
      sqin: "in²",
      acre: "acre",
      hectare: "hectare",
    };

    const pluralize = (value, unit) => {
      if (value === 1) return unit;
      if (unit === "acre" || unit === "hectare") return unit + "s";
      return unit;
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue =
      convertedValue < 0.00001
        ? convertedValue.toExponential(5)
        : Math.round(convertedValue * 100000) / 100000;

    await interaction.reply({
      content: `${value} ${pluralize(
        value,
        unitSymbols[originalUnit]
      )} is ${convertedValue} ${pluralize(convertedValue, unitSymbols[newUnit])}`,
    });
  },
};
