const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("luminance")
    .setDescription("Converts luminance measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Candela per square meter", value: "candela_per_square_meter" },
          { name: "Candela per square foot", value: "candela_per_square_foot" },
          { name: "Stilb", value: "stilb" },
          { name: "Nit", value: "nit" },
          { name: "Millinit", value: "millinit" },
          { name: "Lambert", value: "lambert" },
          { name: "Millilambert", value: "millilambert" },
          { name: "Foot-lambert", value: "foot_lambert" },
          { name: "Apostilb", value: "apostilb" },
          { name: "Blondel", value: "blondel" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Candela per square meter", value: "candela_per_square_meter" },
          { name: "Candela per square foot", value: "candela_per_square_foot" },
          { name: "Stilb", value: "stilb" },
          { name: "Nit", value: "nit" },
          { name: "Millinit", value: "millinit" },
          { name: "Lambert", value: "lambert" },
          { name: "Millilambert", value: "millilambert" },
          { name: "Foot-lambert", value: "foot_lambert" },
          { name: "Apostilb", value: "apostilb" },
          { name: "Blondel", value: "blondel" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      candela_per_square_meter: 1,
      candela_per_square_foot: 10.7639,
      stilb: 10000,
      nit: 1,
      millinit: 0.001,
      lambert: 3183.0988618,
      millilambert: 3.1830988618,
      foot_lambert: 3.4262591,
      apostilb: 0.31830988618,
      blondel: 0.31830988618,
    };

    const unitSymbols = {
      candela_per_square_meter: "cd/m²",
      candela_per_square_foot: "cd/ft²",
      stilb: "sb",
      nit: "nt",
      millinit: "mnt",
      lambert: "L",
      millilambert: "mL",
      foot_lambert: "fL",
      apostilb: "asb",
      blondel: "blondel",
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
