const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { API_KEY } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("currency")
    .setDescription("Converts currency rates")
    .addNumberOption((option) =>
      option.setName("quantity").setDescription("The original unit's measurement").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_currency")
        .setDescription("Currency to convert from")
        .setRequired(true)
        .addChoices(
          { name: "Australian Dollar (AUD)", value: "aud" },
          { name: "Brazilian Real (BRL)", value: "brl" },
          { name: "British Pound (GBP)", value: "gbp" },
          { name: "Canadian Dollar (CAD)", value: "cad" },
          { name: "Chinese Yuan Renminbi (CNY)", value: "cny" },
          { name: "Danish Krone (DKK)", value: "dkk"},
          { name: "Euro (EUR)", value: "eur" },
          { name: "Hong Kong Dollar (HKD)", value: "hkd" },
          { name: "Indian Rupee (INR)", value: "inr" },
          { name: "Indonesian Rupiah (IDR)", value: "idr" },
          { name: "Japanese Yen (JPY)", value: "jpy" },
          { name: "Malaysian Ringgit (MYR)", value: "myr" },
          { name: "Mexican Peso (MXN)", value: "mxn" },
          { name: "New Zealand Dollar (NZD)", value: "nzd" },
          { name: "Norwegian Krone (NOK)", value: "nok" },
          { name: "Philippine Peso (PHP)", value: "php" },
          { name: "Russian Ruble (RUB)", value: "rub" },
          { name: "Singapore Dollar (SGD)", value: "sgd" },
          { name: "South African Rand (ZAR)", value: "zar" },
          { name: "South Korean Won (KRW)", value: "krw" },
          { name: "Swedish Krona (SEK)", value: "sek" },
          { name: "Swiss Franc (CHF)", value: "chf" },
          { name: "Turkish Lira (TRY)", value: "try" },
          { name: "United States Dollar (USD)", value: "usd" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("target_currency")
        .setDescription("Currency to convert to")
        .setRequired(true)
        .addChoices(
          { name: "Australian Dollar (AUD)", value: "aud" },
          { name: "Brazilian Real (BRL)", value: "brl" },
          { name: "British Pound (GBP)", value: "gbp" },
          { name: "Canadian Dollar (CAD)", value: "cad" },
          { name: "Chinese Yuan Renminbi (CNY)", value: "cny" },
          { name: "Danish Krone (DKK)", value: "dkk"},
          { name: "Euro (EUR)", value: "eur" },
          { name: "Hong Kong Dollar (HKD)", value: "hkd" },
          { name: "Indian Rupee (INR)", value: "inr" },
          { name: "Indonesian Rupiah (IDR)", value: "idr" },
          { name: "Japanese Yen (JPY)", value: "jpy" },
          { name: "Malaysian Ringgit (MYR)", value: "myr" },
          { name: "Mexican Peso (MXN)", value: "mxn" },
          { name: "New Zealand Dollar (NZD)", value: "nzd" },
          { name: "Norwegian Krone (NOK)", value: "nok" },
          { name: "Philippine Peso (PHP)", value: "php" },
          { name: "Russian Ruble (RUB)", value: "rub" },
          { name: "Singapore Dollar (SGD)", value: "sgd" },
          { name: "South African Rand (ZAR)", value: "zar" },
          { name: "South Korean Won (KRW)", value: "krw" },
          { name: "Swedish Krona (SEK)", value: "sek" },
          { name: "Swiss Franc (CHF)", value: "chf" },
          { name: "Turkish Lira (TRY)", value: "try" },
          { name: "United States Dollar (USD)", value: "usd" }
        )
    ),

  async execute(interaction) {
    const value = interaction.options.getNumber("quantity");
    const originalUnit = interaction.options.getString("original_currency");
    const targetUnit = interaction.options.getString("target_currency");

    const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;


    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates.");
      }
      const data = await response.json();

      if (!data.data[targetUnit.toUpperCase()]) {
        throw new Error("Invalid currency selection.");
      }

      const rate = data.data[targetUnit.toUpperCase()];
      const convertedValue = (value * rate).toFixed(2);

      await interaction.reply({
        content: `${value} ${originalUnit.toUpperCase()} is approximately ${convertedValue} ${targetUnit.toUpperCase()}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply("Sorry, I couldn't fetch the exchange rate at the moment.");
    }
  },
};
