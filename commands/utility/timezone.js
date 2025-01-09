const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment-timezone");

const timezoneAbbreviations = {
  UTC: "UTC",
  GMT: "GMT",
  "Africa/Abidjan": "GMT",
  "Africa/Cairo": "EET",
  "Africa/Johannesburg": "SAST",
  "Africa/Lagos": "WAT",
  "America/Anchorage": "AKST",
  "America/Chicago": "CST",
  "America/Denver": "MST",
  "America/Los_Angeles": "PST",
  "America/New_York": "EST",
  "America/Sao_Paulo": "BRT",
  "Asia/Bangkok": "ICT",
  "Asia/Dubai": "GST",
  "Asia/Kolkata": "IST",
  "Asia/Shanghai": "CST",
  "Asia/Tokyo": "JST",
  "Asia/Singapore": "SGT",
  "Australia/Sydney": "AEST",
  "Europe/Athens": "EET",
  "Europe/London": "GMT",
  "Europe/Paris": "CET",
  "Pacific/Auckland": "NZST",
  "Pacific/Honolulu": "HST",
};

const timezoneNames = {
  "America/Anchorage": "Alaska Standard Time",
  "Australia/Sydney": "Australian Eastern Standard Time",
  "America/Sao_Paulo": "Brasília Time",
  "Europe/Paris": "Central European Time",
  "America/Chicago": "Central Standard Time",
  "Asia/Shanghai": "China Standard Time",
  "Europe/Athens": "Eastern European Time",
  "America/New_York": "Eastern Standard Time",
  "Asia/Dubai": "Gulf Standard Time",
  GMT: "Greenwich Mean Time",
  "Pacific/Honolulu": "Hawaii-Aleutian Standard Time",
  "Asia/Bangkok": "Indochina Time",
  "Asia/Kolkata": "India Standard Time",
  "Asia/Tokyo": "Japan Standard Time",
  "America/Denver": "Mountain Standard Time",
  "Pacific/Auckland": "New Zealand Standard Time",
  "America/Los_Angeles": "Pacific Standard Time",
  "Africa/Johannesburg": "South Africa Standard Time",
  "Asia/Singapore": "Singapore Time",
  UTC: "Coordinated Universal Time",
  "Africa/Lagos": "West Africa Time",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timezone")
    .setDescription("Converts time between different timezones")
    .addStringOption((option) =>
      option.setName("time").setDescription("The time to convert (HH:MM)").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("original_timezone")
        .setDescription("Timezone to convert from")
        .setRequired(true)
        .addChoices(
          { name: "AKST (Alaska Standard Time)", value: "America/Anchorage" },
          { name: "AEST (Australian Eastern Standard Time)", value: "Australia/Sydney" },
          { name: "BRT (Brasília Time)", value: "America/Sao_Paulo" },
          { name: "CET (Central European Time)", value: "Europe/Paris" },
          { name: "CST (Central Standard Time)", value: "America/Chicago" },
          { name: "CST (China Standard Time)", value: "Asia/Shanghai" },
          { name: "EET (Eastern European Time)", value: "Europe/Athens" },
          { name: "EST (Eastern Standard Time)", value: "America/New_York" },
          { name: "GST (Gulf Standard Time)", value: "Asia/Dubai" },
          { name: "GMT (Greenwich Mean Time)", value: "GMT" },
          { name: "HST (Hawaii-Aleutian Standard Time)", value: "Pacific/Honolulu" },
          { name: "ICT (Indochina Time)", value: "Asia/Bangkok" },
          { name: "IST (India Standard Time)", value: "Asia/Kolkata" },
          { name: "JST (Japan Standard Time)", value: "Asia/Tokyo" },
          { name: "MST (Mountain Standard Time)", value: "America/Denver" },
          { name: "NZST (New Zealand Standard Time)", value: "Pacific/Auckland" },
          { name: "PST (Pacific Standard Time)", value: "America/Los_Angeles" },
          { name: "SAST (South Africa Standard Time)", value: "Africa/Johannesburg" },
          { name: "SGT (Singapore Time)", value: "Asia/Singapore" },
          { name: "UTC (Coordinated Universal Time)", value: "UTC" },
          { name: "WAT (West Africa Time)", value: "Africa/Lagos" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("new_timezone")
        .setDescription("Timezone to convert to")
        .setRequired(true)
        .addChoices(
          { name: "AKST (Alaska Standard Time)", value: "America/Anchorage" },
          { name: "AEST (Australian Eastern Standard Time)", value: "Australia/Sydney" },
          { name: "BRT (Brasília Time)", value: "America/Sao_Paulo" },
          { name: "CET (Central European Time)", value: "Europe/Paris" },
          { name: "CST (Central Standard Time)", value: "America/Chicago" },
          { name: "CST (China Standard Time)", value: "Asia/Shanghai" },
          { name: "EET (Eastern European Time)", value: "Europe/Athens" },
          { name: "EST (Eastern Standard Time)", value: "America/New_York" },
          { name: "GST (Gulf Standard Time)", value: "Asia/Dubai" },
          { name: "GMT (Greenwich Mean Time)", value: "GMT" },
          { name: "HST (Hawaii-Aleutian Standard Time)", value: "Pacific/Honolulu" },
          { name: "ICT (Indochina Time)", value: "Asia/Bangkok" },
          { name: "IST (India Standard Time)", value: "Asia/Kolkata" },
          { name: "JST (Japan Standard Time)", value: "Asia/Tokyo" },
          { name: "MST (Mountain Standard Time)", value: "America/Denver" },
          { name: "NZST (New Zealand Standard Time)", value: "Pacific/Auckland" },
          { name: "PST (Pacific Standard Time)", value: "America/Los_Angeles" },
          { name: "SAST (South Africa Standard Time)", value: "Africa/Johannesburg" },
          { name: "SGT (Singapore Time)", value: "Asia/Singapore" },
          { name: "UTC (Coordinated Universal Time)", value: "UTC" },
          { name: "WAT (West Africa Time)", value: "Africa/Lagos" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("am_pm")
        .setDescription("AM or PM (optional, only for 12-hour format)")
        .addChoices({ name: "AM", value: "AM" }, { name: "PM", value: "PM" })
    ),

  async execute(interaction) {
    const time = interaction.options.getString("time");
    const originalTimezone = interaction.options.getString("original_timezone");
    const newTimezone = interaction.options.getString("new_timezone");
    const amPm = interaction.options.getString("am_pm");

    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return interaction.reply({
        content: "Invalid time format. Please use HH:MM format.",
        ephemeral: true,
      });
    }

    let [hours, minutes] = time.split(":").map(Number);
    if (amPm) {
      if (hours > 12 || (hours === 12 && minutes > 59)) {
        return interaction.reply({
          content:
            "Invalid time for 12-hour format. Please use HH:MM format with times not past 12:59.",
          ephemeral: true,
        });
      }
      if (amPm === "PM" && hours !== 12) {
        hours += 12;
      } else if (amPm === "AM" && hours === 12) {
        hours = 0;
      }
    }

    const originalTime = moment.tz(`${hours}:${minutes}`, "HH:mm", originalTimezone);
    const convertedTime = originalTime.clone().tz(newTimezone);

    const originalTimezoneAbbr = timezoneAbbreviations[originalTimezone] || originalTimezone;
    const newTimezoneAbbr = timezoneAbbreviations[newTimezone] || newTimezone;

    const originalTimezoneName = timezoneNames[originalTimezone] || originalTimezone;
    const newTimezoneName = timezoneNames[newTimezone] || newTimezone;

    const originalTimeString = amPm ? originalTime.format("hh:mm A") : originalTime.format("HH:mm");
    const convertedTimeString = amPm
      ? convertedTime.format("hh:mm A")
      : convertedTime.format("HH:mm");

    await interaction.reply({
      content: `${originalTimeString} ${originalTimezoneAbbr} (${originalTimezoneName}) is ${convertedTimeString} ${newTimezoneAbbr} (${newTimezoneName})`,
    });
  },
};
