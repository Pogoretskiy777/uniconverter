const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("radiation")
    .setDescription("Converts radiation dose measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Gray", value: "gray" },
          { name: "Milligray", value: "milligray" },
          { name: "Microgray", value: "microgray" },
          { name: "Rad", value: "rad" },
          { name: "Sievert", value: "sievert" },
          { name: "Millisievert", value: "millisievert" },
          { name: "Microsievert", value: "microsievert" },
          { name: "Rem", value: "rem" },
          { name: "Erg per gram", value: "ergpergram" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Gray", value: "gray" },
          { name: "Milligray", value: "milligray" },
          { name: "Microgray", value: "microgray" },
          { name: "Rad", value: "rad" },
          { name: "Sievert", value: "sievert" },
          { name: "Millisievert", value: "millisievert" },
          { name: "Microsievert", value: "microsievert" },
          { name: "Rem", value: "rem" },
          { name: "Erg per gram", value: "ergpergram" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      gray: 1,
      milligray: 1e-3,
      microgray: 1e-6,
      rad: 0.01,
      sievert: 1,
      millisievert: 1e-3,
      microsievert: 1e-6,
      rem: 0.01,
      ergpergram: 1e-4,
    };

    const unitSymbols = {
      gray: "Gy",
      milligray: "mGy",
      microgray: "µGy",
      rad: "rad",
      sievert: "Sv",
      millisievert: "mSv",
      microsievert: "µSv",
      rem: "rem",
      ergpergram: "erg/g",
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
