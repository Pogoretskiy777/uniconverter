const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Converts time measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Nanosecond", value: "nanosecond" },
          { name: "Microsecond", value: "microsecond" },
          { name: "Millisecond", value: "millisecond" },
          { name: "Second", value: "second" },
          { name: "Minute", value: "minute" },
          { name: "Hour", value: "hour" },
          { name: "Day", value: "day" },
          { name: "Week", value: "week" },
          { name: "Month", value: "month" },
          { name: "Calendar year", value: "year" },
          { name: "Decade", value: "decade" },
          { name: "Century", value: "century" },
          { name: "Millennium", value: "millennium" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Nanosecond", value: "nanosecond" },
          { name: "Microsecond", value: "microsecond" },
          { name: "Millisecond", value: "millisecond" },
          { name: "Second", value: "second" },
          { name: "Minute", value: "minute" },
          { name: "Hour", value: "hour" },
          { name: "Day", value: "day" },
          { name: "Week", value: "week" },
          { name: "Month", value: "month" },
          { name: "Calendar year", value: "year" },
          { name: "Decade", value: "decade" },
          { name: "Century", value: "century" },
          { name: "Millennium", value: "millennium" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const conversionRates = {
      nanosecond: 1e-9,
      microsecond: 1e-6,
      millisecond: 0.001,
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2629743.83,
      year: 31556926,
      decade: 315569260,
      century: 3155692600,
      millennium: 31556926000,
    };

    const unitSymbols = {
      nanosecond: { symbol: "ns", isSymbol: true },
      microsecond: { symbol: "µs", isSymbol: true },
      millisecond: { symbol: "ms", isSymbol: true },
      second: { symbol: "second", isSymbol: false },
      minute: { symbol: "minute", isSymbol: false },
      hour: { symbol: "hour", isSymbol: false },
      day: { symbol: "day", isSymbol: false },
      week: { symbol: "week", isSymbol: false },
      month: { symbol: "month", isSymbol: false },
      year: { symbol: "year", isSymbol: false },
      decade: { symbol: "decade", isSymbol: false },
      century: { symbol: "century", isSymbol: false },
      millennium: { symbol: "millennium", isSymbol: false },
    };

    const pluralize = (value, unit, isSymbol) => {
      if (isSymbol) return unit;

      if (value !== 1) {
        if (unit === "century") {
          return "centuries";
        } else if (unit === "millennium") {
          return "millennia";
        } else {
          return unit + "s";
        }
      }

      return unit;
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${pluralize(
        value,
        unitSymbols[originalUnit].symbol,
        unitSymbols[originalUnit].isSymbol
      )} is ${convertedValue} ${pluralize(
        convertedValue,
        unitSymbols[newUnit].symbol,
        unitSymbols[newUnit].isSymbol
      )}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
