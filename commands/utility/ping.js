// Import the SlashCommandBuilder class from discord.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName("ping") // Set the command name to "ping"
    .setDescription("Replies with Pong!"), // Set the command description

  // Define the execute function to handle the command execution
  async execute(interaction) {
    // Reply with "Pong!" when the command is executed
    await interaction.reply("Pong!");
  },
};
