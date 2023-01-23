const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { format, formatISO } = require("date-fns");
const { id } = require("date-fns/locale");

module.exports = {
  name: "sholat",
  data: new SlashCommandBuilder()
    .setName("sholat")
    .setDescription("Show schedule of pray based on user location input")
    .addStringOption((option) =>
      option.setName("lokasi").setDescription("Location").setRequired(true)
    ),
  execute: async (interaction) => {
    const _year = new Date().getFullYear();
    const _month = format(new Date(), "MM");
    const _currentDate = formatISO(new Date(), { representation: "date" });
    const _location = interaction.options.getString("lokasi").toLowerCase();
    const _endpoint = `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${_location}/${_year}/${_month}.json`;
    await interaction.deferReply();
    console.log(_year);
    console.log(_month);
    console.log(_currentDate);
    console.log(_endpoint);
    axios
      .get(_endpoint)
      .then((res) => {
        const schedule = res.data.find((data) => data.tanggal === _currentDate);
        const { shubuh, terbit, dzuhur, ashr, magrib, isya } = schedule;

        const location = `${_location.charAt(0).toUpperCase()}${_location.slice(
          1
        )}`;
        const praySchedule = new EmbedBuilder()
          .setTitle(`Jadwal Sholat Daerah ${location} 🕕`)
          .addFields([
            {
              name: "Hari, Tanggal",
              value: format(new Date(_currentDate), "PPPP", {
                locale: id,
              }),
            },
            { name: "Subuh", value: shubuh, inline: true },
            { name: "Terbit", value: terbit, inline: true },
            { name: "Dzuhur", value: dzuhur, inline: true },
            { name: "Ashar", value: ashr, inline: true },
            { name: "Maghrib", value: magrib, inline: true },
            {
              name: "Sumber Data",
              value: "https://github.com/lakuapik/jadwalsholatorg",
            },
          ])
          .setColor("#4484f1")
          .setFooter({
            text: `Command used by: ${interaction.user.tag}`,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.editReply({ embeds: [praySchedule] });
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 404) {
          interaction.editReply(
            `Jadwal lokasi **${location}** tidak ditemukan!`
          );
        } else {
          interaction.editReply(`${err?.response?.data}`);
        }
      });
  },
};
