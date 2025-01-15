const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("storage")
    .setDescription("Converts digital storage measurements")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_unit")
        .setDescription("Unit to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Bit", value: "bit" },
          { name: "Kilobit", value: "kbit" },
          { name: "Kibibit", value: "kibit" },
          { name: "Megabit", value: "mbit" },
          { name: "Mebibit", value: "mibit" },
          { name: "Gigabit", value: "gbit" },
          { name: "Gibibit", value: "gibit" },
          { name: "Terabit", value: "tbit" },
          { name: "Tebibit", value: "tibit" },
          { name: "Petabit", value: "pbit" },
          { name: "Pebibit", value: "pibit" },
          { name: "Byte", value: "byte" },
          { name: "Kilobyte", value: "kbyte" },
          { name: "Kibibyte", value: "kibyte" },
          { name: "Megabyte", value: "mbyte" },
          { name: "Mebibyte", value: "mibyte" },
          { name: "Gigabyte", value: "gbyte" },
          { name: "Gibibyte", value: "gibyte" },
          { name: "Terabyte", value: "tbyte" },
          { name: "Tebibyte", value: "tibyte" },
          { name: "Petabyte", value: "pbyte" },
          { name: "Pebibyte", value: "pibyte" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_unit")
        .setDescription("Unit to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Bit", value: "bit" },
          { name: "Kilobit", value: "kbit" },
          { name: "Kibibit", value: "kibit" },
          { name: "Megabit", value: "mbit" },
          { name: "Mebibit", value: "mibit" },
          { name: "Gigabit", value: "gbit" },
          { name: "Gibibit", value: "gibit" },
          { name: "Terabit", value: "tbit" },
          { name: "Tebibit", value: "tibit" },
          { name: "Petabit", value: "pbit" },
          { name: "Pebibit", value: "pibit" },
          { name: "Byte", value: "byte" },
          { name: "Kilobyte", value: "kbyte" },
          { name: "Kibibyte", value: "kibyte" },
          { name: "Megabyte", value: "mbyte" },
          { name: "Mebibyte", value: "mibyte" },
          { name: "Gigabyte", value: "gbyte" },
          { name: "Gibibyte", value: "gibyte" },
          { name: "Terabyte", value: "tbyte" },
          { name: "Tebibyte", value: "tibyte" },
          { name: "Petabyte", value: "pbyte" },
          { name: "Pebibyte", value: "pibyte" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_unit");
    const newUnit = interaction.options.getString("new_unit");

    const conversionRates = {
      bit: 1,
      kbit: 1e3,
      kibit: 1024,
      mbit: 1e6,
      mibit: 1048576,
      gbit: 1e9,
      gibit: 1073741824,
      tbit: 1e12,
      tibit: 1099511627776,
      pbit: 1e15,
      pibit: 1125899906842624,
      byte: 8,
      kbyte: 8e3,
      kibyte: 8192,
      mbyte: 8e6,
      mibyte: 8388608,
      gbyte: 8e9,
      gibyte: 8589934592,
      tbyte: 8e12,
      tibyte: 8796093022208,
      pbyte: 8e15,
      pibyte: 9007199254740992,
    };

    const unitSymbols = {
      bit: "b",
      kbit: "kb",
      kibit: "Kib",
      mbit: "Mb",
      mibit: "Mib",
      gbit: "Gb",
      gibit: "Gib",
      tbit: "Tb",
      tibit: "Tib",
      pbit: "Pb",
      pibit: "Pib",
      byte: "B",
      kbyte: "kB",
      kibyte: "KiB",
      mbyte: "MB",
      mibyte: "MiB",
      gbyte: "GB",
      gibyte: "GiB",
      tbyte: "TB",
      tibyte: "TiB",
      pbyte: "PB",
      pibyte: "PiB",
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
