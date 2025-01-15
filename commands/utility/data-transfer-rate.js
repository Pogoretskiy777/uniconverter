const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("data-transfer")
    .setDescription("Converts data transfer rate measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Bit per second", value: "bps" },
          { name: "Kilobit per second", value: "kbps" },
          { name: "Kilobyte per second", value: "kBps" },
          { name: "Kibibit per second", value: "Kibps" },
          { name: "Megabit per second", value: "Mbps" },
          { name: "Megabyte per second", value: "MBps" },
          { name: "Mebibit per second", value: "Mibps" },
          { name: "Gigabit per second", value: "Gbps" },
          { name: "Gigabyte per second", value: "GBps" },
          { name: "Gibibit per second", value: "Gibps" },
          { name: "Terabit per second", value: "Tbps" },
          { name: "Terabyte per second", value: "TBps" },
          { name: "Tebibit per second", value: "Tibps" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Bit per second", value: "bps" },
          { name: "Kilobit per second", value: "kbps" },
          { name: "Kilobyte per second", value: "kBps" },
          { name: "Kibibit per second", value: "Kibps" },
          { name: "Megabit per second", value: "Mbps" },
          { name: "Megabyte per second", value: "MBps" },
          { name: "Mebibit per second", value: "Mibps" },
          { name: "Gigabit per second", value: "Gbps" },
          { name: "Gigabyte per second", value: "GBps" },
          { name: "Gibibit per second", value: "Gibps" },
          { name: "Terabit per second", value: "Tbps" },
          { name: "Terabyte per second", value: "TBps" },
          { name: "Tebibit per second", value: "Tibps" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      bps: 1,
      kbps: 1e3,
      kBps: 8e3,
      Kibps: 1024,
      Mbps: 1e6,
      MBps: 8e6,
      Mibps: 1048576,
      Gbps: 1e9,
      GBps: 8e9,
      Gibps: 1073741824,
      Tbps: 1e12,
      TBps: 8e12,
      Tibps: 1099511627776,
    };

    const unitSymbols = {
      bps: "bps",
      kbps: "kbps",
      kBps: "kBps",
      Kibps: "Kibps",
      Mbps: "Mbps",
      MBps: "MBps",
      Mibps: "Mibps",
      Gbps: "Gbps",
      GBps: "GBps",
      Gibps: "Gibps",
      Tbps: "Tbps",
      TBps: "TBps",
      Tibps: "Tibps",
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
