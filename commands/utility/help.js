const { SlashCommandBuilder, MessageFlags, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Lists all conversion commands"),

  async execute(interaction) {
    await interaction.reply({
      content: `UniConverter supports the following conversions:\n
**/angle** - Converts plane angle measurements
**/area**  - Converts area measurements
**/data-transfer** - Converts data transfer rates
**/storage** - Converts digital storage measurements
**/energy** - Converts energy measurements
**/field-strength** - Converts magnetic field strength measurements
**/flux** - Converts magnetic flux measurements
**/force** - Converts force measurements
**/frequency** - Converts frequency measurements
**/fuel** - Converts fuel economy measurements
**/length** - Converts length measurements
**/luminance** - Converts luminance measurements
**/mass** - Converts mass measurements
**/power** - Converts power measurements
**/pressure** - Converts pressure measurements
**/speed** - Converts speed measurements
**/temp** - Converts temperature measurements
**/time** - Converts time measurements
**/timezone** - Converts between timezones (AM/PM optional)
**/volume** - Converts volume measurements`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
