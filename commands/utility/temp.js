const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("temp")
    .setDescription("Converts temperature measures/")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Fahrenheit", value: "fahrenheit" },
          { name: "Celsius", value: "celsius" },
          { name: "Kelvin", value: "kelvin" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Fahrenheit", value: "fahrenheit" },
          { name: "Celsius", value: "celsius" },
          { name: "Kelvin", value: "kelvin" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const unitSymbols = {
      celsius: "°C",
      fahrenheit: "°F",
      kelvin: "K",
    };

    let convertedValue;

    switch (originalUnit) {
      case newUnit:
        convertedValue = value;
        break;
      case "celsius":
        switch (newUnit) {
          case "fahrenheit":
            convertedValue = (value * 9) / 5 + 32;
            break;
          case "kelvin":
            convertedValue = value + 273.15;
            break;
        }
        break;
      case "fahrenheit":
        switch (newUnit) {
          case "celsius":
            convertedValue = ((value - 32) * 5) / 9;
            break;
          case "kelvin":
            convertedValue = ((value - 32) * 5) / 9 + 273.15;
            break;
        }
        break;
      case "kelvin":
        switch (newUnit) {
          case "celsius":
            convertedValue = value - 273.15;
            break;
          case "fahrenheit":
            convertedValue = ((value - 273.15) * 9) / 5 + 32;
            break;
        }
        break;
    }

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
