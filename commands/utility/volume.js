const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Converts volume measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "US Gallon", value: "us_gallon" },
          { name: "US Quart", value: "us_quart" },
          { name: "US Pint", value: "us_pint" },
          { name: "US Cup", value: "us_cup" },
          { name: "US Fluid Ounce", value: "us_fluid_ounce" },
          { name: "US Tablespoon", value: "us_tablespoon" },
          { name: "US Teaspoon", value: "us_teaspoon" },
          { name: "Cubic Meter", value: "cubic_meter" },
          { name: "Liter", value: "liter" },
          { name: "Milliliter", value: "milliliter" },
          { name: "Imperial Gallon", value: "imperial_gallon" },
          { name: "Imperial Quart", value: "imperial_quart" },
          { name: "Imperial Pint", value: "imperial_pint" },
          { name: "Imperial Cup", value: "imperial_cup" },
          { name: "Imperial Fluid Ounce", value: "imperial_fluid_ounce" },
          { name: "Imperial Tablespoon", value: "imperial_tablespoon" },
          { name: "Imperial Teaspoon", value: "imperial_teaspoon" },
          { name: "Cubic Foot", value: "cubic_foot" },
          { name: "Cubic Inch", value: "cubic_inch" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "US Gallon", value: "us_gallon" },
          { name: "US Quart", value: "us_quart" },
          { name: "US Pint", value: "us_pint" },
          { name: "US Cup", value: "us_cup" },
          { name: "US Fluid Ounce", value: "us_fluid_ounce" },
          { name: "US Tablespoon", value: "us_tablespoon" },
          { name: "US Teaspoon", value: "us_teaspoon" },
          { name: "Cubic Meter", value: "cubic_meter" },
          { name: "Liter", value: "liter" },
          { name: "Milliliter", value: "milliliter" },
          { name: "Imperial Gallon", value: "imperial_gallon" },
          { name: "Imperial Quart", value: "imperial_quart" },
          { name: "Imperial Pint", value: "imperial_pint" },
          { name: "Imperial Cup", value: "imperial_cup" },
          { name: "Imperial Fluid Ounce", value: "imperial_fluid_ounce" },
          { name: "Imperial Tablespoon", value: "imperial_tablespoon" },
          { name: "Imperial Teaspoon", value: "imperial_teaspoon" },
          { name: "Cubic Foot", value: "cubic_foot" },
          { name: "Cubic Inch", value: "cubic_inch" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const conversionRates = {
      us_gallon: 3.78541,
      us_quart: 0.946353,
      us_pint: 0.473176,
      us_cup: 0.24,
      us_fluid_ounce: 0.0295735,
      us_tablespoon: 0.0147868,
      us_teaspoon: 0.00492892,
      cubic_meter: 1000,
      liter: 1,
      milliliter: 0.001,
      imperial_gallon: 4.54609,
      imperial_quart: 1.13652,
      imperial_pint: 0.568261,
      imperial_cup: 0.284131,
      imperial_fluid_ounce: 0.0284131,
      imperial_tablespoon: 0.0177582,
      imperial_teaspoon: 0.00591939,
      cubic_foot: 28.3168,
      cubic_inch: 0.0163871,
    };

    const unitSymbols = {
      us_gallon: "US gal",
      us_quart: "US qt",
      us_pint: "US pt",
      us_cup: "US cup",
      us_fluid_ounce: "US fl oz",
      us_tablespoon: "US tbsp",
      us_teaspoon: "US tsp",
      cubic_meter: "m³",
      liter: "L",
      milliliter: "mL",
      imperial_gallon: "Imp gal",
      imperial_quart: "Imp qt",
      imperial_pint: "Imp pt",
      imperial_cup: "Imp cup",
      imperial_fluid_ounce: "Imp fl oz",
      imperial_tablespoon: "Imp tbsp",
      imperial_teaspoon: "Imp tsp",
      cubic_foot: "ft³",
      cubic_inch: "in³",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
