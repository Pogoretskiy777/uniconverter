const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption((option) =>
      option.setName("command").setDescription("The command to reload.").setRequired(true)
    ),
  async execute(interaction) {
    // Get the command name from the interaction options
    const commandName = interaction.options.getString("command", true).toLowerCase();

    // Retrieve the command from the client's commands collection
    const command = interaction.client.commands.get(commandName);

    // If the command does not exist, reply with an error message
    if (!command) {
      return interaction.reply(`There is no command with name \`${commandName}\`!`);
    }

    // Remove the command from the require cache
    delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

    try {
      // Re-require the command module
      const newCommand = require(`../${command.category}/${command.data.name}.js`);

      // Update the client's commands collection with the new command
      interaction.client.commands.set(newCommand.data.name, newCommand);

      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
      );
    }
  },
};
