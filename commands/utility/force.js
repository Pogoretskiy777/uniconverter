const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("force")
    .setDescription("Converts force measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Newtons", value: "newton" },
          { name: "Pound-force", value: "pound_force" },
          { name: "Gram-force", value: "gram_force" },
          { name: "Kilogram-force", value: "kilogram_force" },
          { name: "Poundal", value: "poundal" },
          { name: "Ounce-force", value: "ounce_force" },
          { name: "Ton-force", value: "ton_force" },
          { name: "Pond", value: "pond" },
          { name: "Kilopond", value: "kilopond" },
          { name: "Dyne", value: "dyne" },
          { name: "Joule-per-meter", value: "joule_per_meter" },
          { name: "Pound-foot per square second", value: "pound_foot_per_square_second" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Newtons", value: "newton" },
          { name: "Pound-force", value: "pound_force" },
          { name: "Gram-force", value: "gram_force" },
          { name: "Kilogram-force", value: "kilogram_force" },
          { name: "Poundal", value: "poundal" },
          { name: "Ounce-force", value: "ounce_force" },
          { name: "Ton-force", value: "ton_force" },
          { name: "Pond", value: "pond" },
          { name: "Kilopond", value: "kilopond" },
          { name: "Dyne", value: "dyne" },
          { name: "Joule-per-meter", value: "joule_per_meter" },
          { name: "Pound-foot per square second", value: "pound_foot_per_square_second" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      newton: 1,
      pound_force: 4.44822,
      gram_force: 0.00980665,
      kilogram_force: 9.80665,
      poundal: 0.138255,
      ounce_force: 0.2780139,
      ton_force: 8896.443,
      pond: 0.00980665,
      dyne: 1e-5,
      joule_per_meter: 1,
      pound_foot_per_square_second: 1.355818,
      kilopond: 9.80665,
    };

    const unitSymbols = {
      newton: "N",
      pound_force: "lbf",
      gram_force: "gf",
      kilogram_force: "kgf",
      poundal: "pdl",
      ounce_force: "ozf",
      ton_force: "tf",
      pond: "p",
      dyne: "dyn",
      joule_per_meter: "J/m",
      pound_foot_per_square_second: "lb·ft/s²",
      kilopond: "kp",
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
