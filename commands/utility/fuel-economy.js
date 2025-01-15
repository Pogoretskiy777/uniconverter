const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fuel")
    .setDescription("Converts fuel economy measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original-unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Miles per gallon", value: "mpg" },
          { name: "Miles per gallon (imperial)", value: "mpg_imperial" },
          { name: "Kilometer per liter", value: "kmpl" },
          { name: "Liter per 100 kilometers", value: "l_per_100km" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new-unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Miles per gallon", value: "mpg" },
          { name: "Miles per gallon (imperial)", value: "mpg_imperial" },
          { name: "Kilometer per liter", value: "kmpl" },
          { name: "Liter per 100 kilometers", value: "l_per_100km" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original-unit");
    const newUnit = interaction.options.getString("new-unit");

    const unitSymbols = {
      mpg: "mpg",
      mpg_imperial: "mpg (imperial)",
      kmpl: "km/l",
      l_per_100km: "l/100km",
    };

    let convertedValue;

    switch (originalUnit) {
      case newUnit:
        convertedValue = value;
        break;
      case "mpg":
        switch (newUnit) {
          case "mpg_imperial":
            convertedValue = value * 1.20095;
            break;
          case "kmpl":
            convertedValue = value * 0.425144;
            break;
          case "l_per_100km":
            convertedValue = 235.215 / value;
            break;
        }
        break;
      case "mpg_imperial":
        switch (newUnit) {
          case "mpg":
            convertedValue = value / 1.20095;
            break;
          case "kmpl":
            convertedValue = value * 0.354006;
            break;
          case "l_per_100km":
            convertedValue = 282.481 / value;
            break;
        }
        break;
      case "kmpl":
        switch (newUnit) {
          case "mpg":
            convertedValue = value * 2.35215;
            break;
          case "mpg_imperial":
            convertedValue = value * 2.82481;
            break;
          case "l_per_100km":
            convertedValue = 100 / value;
            break;
        }
        break;
      case "l_per_100km":
        switch (newUnit) {
          case "mpg":
            convertedValue = 235.215 / value;
            break;
          case "mpg_imperial":
            convertedValue = 282.481 / value;
            break;
          case "kmpl":
            convertedValue = 100 / value;
            break;
        }
        break;
    }

    convertedValue = Math.round(convertedValue * 1000) / 1000;

    await interaction.reply({
      content: `${value} ${unitSymbols[originalUnit]} is ${convertedValue} ${unitSymbols[newUnit]}`,
    });
  },
};
