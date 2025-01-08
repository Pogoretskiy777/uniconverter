const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("pressure")
    .setDescription("Converts pressure measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Bar", value: "bar" },
          { name: "Pascal", value: "pa" },
          { name: "Pound-force per square inch", value: "psi" },
          { name: "Standard atmosphere", value: "atm" },
          { name: "Torr", value: "torr" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Bar", value: "bar" },
          { name: "Pascal", value: "pa" },
          { name: "Pound-force per square inch", value: "psi" },
          { name: "Standard atmosphere", value: "atm" },
          { name: "Torr", value: "torr" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      bar: 100000,
      pa: 1,
      psi: 6894.76,
      atm: 101325,
      torr: 133.322,
    };

    const unitSymbols = {
      bar: "bar",
      pa: "Pa",
      psi: "psi",
      atm: "atm",
      torr: "Torr",
    };

    let convertedValue = (value * conversionRates[originalUnit]) / conversionRates[newUnit];
    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
