const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("power")
    .setDescription("Converts power measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Watt", value: "watt" },
          { name: "Kilowatt", value: "kilowatt" },
          { name: "Horsepower", value: "horsepower" },
          { name: "Megawatt", value: "megawatt" },
          { name: "Gigawatt", value: "gigawatt" },
          { name: "British Thermal Unit per Hour", value: "btu_per_hour" },
          { name: "Decibel milli-watt", value: "dbm" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Watt", value: "watt" },
          { name: "Kilowatt", value: "kilowatt" },
          { name: "Horsepower", value: "horsepower" },
          { name: "Megawatt", value: "megawatt" },
          { name: "Gigawatt", value: "gigawatt" },
          { name: "British Thermal Unit per Hour", value: "btu_per_hour" },
          { name: "Decibel milli-watt", value: "dbm" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      watt: 1,
      kilowatt: 1e3,
      horsepower: 745.7,
      megawatt: 1e6,
      gigawatt: 1e9,
      btu_per_hour: 0.293071,
      dbm: 0.001,
    };

    const unitSymbols = {
      watt: "W",
      kilowatt: "kW",
      horsepower: "hp",
      megawatt: "MW",
      gigawatt: "GW",
      btu_per_hour: "BTU/h",
      dbm: "dBm",
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
