const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("angle")
    .setDescription("Converts plane angle measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Degree", value: "degree" },
          { name: "Radian", value: "radian" },
          { name: "Gradian", value: "gradian" },
          { name: "Minute of arc", value: "minute_of_arc" },
          { name: "Miliradian", value: "miliradian" },
          { name: "Arcsecond", value: "arcsecond" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Degree", value: "degree" },
          { name: "Radian", value: "radian" },
          { name: "Gradian", value: "gradian" },
          { name: "Minute of arc", value: "minute_of_arc" },
          { name: "Miliradian", value: "miliradian" },
          { name: "Arcsecond", value: "arcsecond" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const unitSymbols = {
      degree: "°",
      radian: "rad",
      gradian: "g",
      minute_of_arc: "'",
      miliradian: "mrad",
      arcsecond: '"',
    };

    const conversions = {
      degree: {
        radian: (value) => value * (Math.PI / 180),
        gradian: (value) => value * (10 / 9),
        minute_of_arc: (value) => value * 60,
        miliradian: (value) => value * ((1000 * Math.PI) / 180),
        arcsecond: (value) => value * 3600,
      },
      radian: {
        degree: (value) => value * (180 / Math.PI),
        gradian: (value) => value * (200 / Math.PI),
        minute_of_arc: (value) => value * (10800 / Math.PI),
        miliradian: (value) => value * 1000,
        arcsecond: (value) => value * (648000 / Math.PI),
      },
      gradian: {
        degree: (value) => value * (9 / 10),
        radian: (value) => value * (Math.PI / 200),
        minute_of_arc: (value) => value * 54,
        miliradian: (value) => value * ((10 * Math.PI) / 200),
        arcsecond: (value) => value * 3240,
      },
      minute_of_arc: {
        degree: (value) => value / 60,
        radian: (value) => value * (Math.PI / 10800),
        gradian: (value) => value / 54,
        miliradian: (value) => value * ((1000 * Math.PI) / 10800),
        arcsecond: (value) => value * 60,
      },
      miliradian: {
        degree: (value) => value * (180 / (1000 * Math.PI)),
        radian: (value) => value / 1000,
        gradian: (value) => value * (200 / (1000 * Math.PI)),
        minute_of_arc: (value) => value * (10800 / (1000 * Math.PI)),
        arcsecond: (value) => value * (648000 / (1000 * Math.PI)),
      },
      arcsecond: {
        degree: (value) => value / 3600,
        radian: (value) => value * (Math.PI / 648000),
        gradian: (value) => value / 3240,
        minute_of_arc: (value) => value / 60,
        miliradian: (value) => value * ((1000 * Math.PI) / 648000),
      },
    };

    let convertedValue;

    if (originalUnit === newUnit) {
      convertedValue = value;
    } else {
      convertedValue = conversions[originalUnit][newUnit](value);
    }

    if (Math.abs(convertedValue) < 0.001) {
      convertedValue = convertedValue.toExponential(3);
    } else {
      convertedValue = convertedValue.toFixed(3);
    }

    await interaction.reply({
      content: `${value}${unitSymbols[originalUnit]} is ${convertedValue}${unitSymbols[newUnit]}`,
    });
  },
};
