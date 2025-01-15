const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("radioactivity")
    .setDescription("Converts radiation activity measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Becquerel", value: "becquerel" },
          { name: "Curie", value: "curie" },
          { name: "Millicurie", value: "millicurie" },
          { name: "Microcurie", value: "microcurie" },
          { name: "Nanocurie", value: "nanocurie" },
          { name: "Picocurie", value: "picocurie" },
          { name: "Rutherford", value: "rutherford" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Becquerel", value: "becquerel" },
          { name: "Curie", value: "curie" },
          { name: "Millicurie", value: "millicurie" },
          { name: "Microcurie", value: "microcurie" },
          { name: "Nanocurie", value: "nanocurie" },
          { name: "Picocurie", value: "picocurie" },
          { name: "Rutherford", value: "rutherford" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      becquerel: 1,
      curie: 3.7e10,
      millicurie: 3.7e7,
      microcurie: 3.7e4,
      nanocurie: 37,
      picocurie: 0.037,
      rutherford: 1e6,
    };

    const unitSymbols = {
      becquerel: "Bq",
      curie: "Ci",
      millicurie: "mCi",
      microcurie: "µCi",
      nanocurie: "nCi",
      picocurie: "pCi",
      rutherford: "Rd",
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
