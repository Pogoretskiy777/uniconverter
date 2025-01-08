// Import the SlashCommandBuilder class from discord.js
const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  // Define the command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName("ping") // Set the command name to "ping"
    .setDescription("Replies with Pong!"), // Set the command description

  // Define the execute function to handle the command execution
  async execute(interaction) {
    await interaction.reply({ content: "Secret Pong!", flags: MessageFlags.Ephemeral });
  },
};
