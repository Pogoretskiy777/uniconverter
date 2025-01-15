const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("potential")
    .setDescription("Converts electrical potential measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Volt", value: "volt" },
          { name: "Millivolt", value: "millivolt" },
          { name: "Microvolt", value: "microvolt" },
          { name: "Kilovolt", value: "kilovolt" },
          { name: "Megavolt", value: "megavolt" },
          { name: "Statvolt", value: "statvolt" },
          { name: "Abvolt", value: "abvolt" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Volt", value: "volt" },
          { name: "Millivolt", value: "millivolt" },
          { name: "Microvolt", value: "microvolt" },
          { name: "Kilovolt", value: "kilovolt" },
          { name: "Megavolt", value: "megavolt" },
          { name: "Statvolt", value: "statvolt" },
          { name: "Abvolt", value: "abvolt" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      volt: 1,
      millivolt: 0.001,
      microvolt: 0.000001,
      kilovolt: 1000,
      megavolt: 1000000,
      statvolt: 299.792458,
      abvolt: 1e-8,
    };

    const unitSymbols = {
      volt: "V",
      millivolt: "mV",
      microvolt: "µV",
      kilovolt: "kV",
      megavolt: "MV",
      statvolt: "statV",
      abvolt: "abV",
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
