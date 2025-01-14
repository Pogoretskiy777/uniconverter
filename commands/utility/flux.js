const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flux")
    .setDescription("Converts magnetic flux measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Weber", value: "weber" },
          { name: "Milliweber", value: "milliweber" },
          { name: "Microweber", value: "microweber" },
          { name: "Volt second", value: "volt_second" },
          { name: "Unit pole", value: "unit_pole" },
          { name: "Megaline", value: "megaline" },
          { name: "Kiloline", value: "kiloline" },
          { name: "Line", value: "line" },
          { name: "Maxwell", value: "maxwell" },
          { name: "Tesla square meter", value: "tesla_square_meter" },
          { name: "Tesla square centimeter", value: "tesla_square_centimeter" },
          { name: "Gauss square centimeter", value: "gauss_square_centimeter" },
          { name: "Magnetic flux quantum", value: "magnetic_flux_quantum" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Weber", value: "weber" },
          { name: "Milliweber", value: "milliweber" },
          { name: "Microweber", value: "microweber" },
          { name: "Volt second", value: "volt_second" },
          { name: "Unit pole", value: "unit_pole" },
          { name: "Megaline", value: "megaline" },
          { name: "Kiloline", value: "kiloline" },
          { name: "Line", value: "line" },
          { name: "Maxwell", value: "maxwell" },
          { name: "Tesla square meter", value: "tesla_square_meter" },
          { name: "Tesla square centimeter", value: "tesla_square_centimeter" },
          { name: "Gauss square centimeter", value: "gauss_square_centimeter" },
          { name: "Magnetic flux quantum", value: "magnetic_flux_quantum" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      weber: 1,
      milliweber: 0.001,
      microweber: 0.000001,
      volt_second: 1,
      unit_pole: 1.2566370614e-7,
      megaline: 1e6,
      kiloline: 1e3,
      line: 1e-4,
      maxwell: 1e-8,
      tesla_square_meter: 1,
      tesla_square_centimeter: 0.0001,
      gauss_square_centimeter: 1e-8,
      magnetic_flux_quantum: 2.067833848e-15,
    };

    const unitSymbols = {
      weber: "Wb",
      milliweber: "mWb",
      microweber: "µWb",
      volt_second: "V·s",
      unit_pole: "unit pole",
      megaline: "Mline",
      kiloline: "kline",
      line: "line",
      maxwell: "Mx",
      tesla_square_meter: "T·m²",
      tesla_square_centimeter: "T·cm²",
      gauss_square_centimeter: "G·cm²",
      magnetic_flux_quantum: "Φ₀",
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
