const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("energy")
    .setDescription("Converts energy measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Joules", value: "j" },
          { name: "Kilojoules", value: "kj" },
          { name: "Gram calorie", value: "cal" },
          { name: "Kilocalorie", value: "kcal" },
          { name: "Watt hour", value: "wh" },
          { name: "Kilowatt hour", value: "kwh" },
          { name: "Electronvolt", value: "ev" },
          { name: "British thermal unit", value: "btu" },
          { name: "US therm", value: "therm" },
          { name: "Foot-pound", value: "ftlb" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Joules", value: "j" },
          { name: "Kilojoules", value: "kj" },
          { name: "Gram calorie", value: "cal" },
          { name: "Kilocalorie", value: "kcal" },
          { name: "Watt hour", value: "wh" },
          { name: "Kilowatt hour", value: "kwh" },
          { name: "Electronvolt", value: "ev" },
          { name: "British thermal unit", value: "btu" },
          { name: "US therm", value: "therm" },
          { name: "Foot-pound", value: "ftlb" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      j: 1,
      kj: 1000,
      cal: 4.184,
      kcal: 4184,
      wh: 3600,
      kwh: 3600000,
      ev: 1.60218e-19,
      btu: 1055.06,
      therm: 105506000,
      ftlb: 1.35582,
    };

    const unitSymbols = {
      j: "J",
      kj: "kJ",
      cal: "cal",
      kcal: "kcal",
      wh: "Wh",
      kwh: "kWh",
      ev: "eV",
      btu: "BTU",
      therm: "therm",
      ftlb: "ft-lb",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue =
      convertedValue < 0.00001
        ? convertedValue.toExponential(5)
        : Math.round(convertedValue * 100000) / 100000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
