const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { format, formatISO } = require("date-fns");
const { id } = require("date-fns/locale");

module.exports = {
  name: "prayer",
  data: new SlashCommandBuilder()
    .setName("prayer")
    .setDescription("Show random prayer in discord channel"),
  execute: async (interaction) => {
    const _endpoint = `https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/v1/random`;
    await interaction.deferReply();
    axios
      .get(_endpoint)
      .then((res) => {
        const { doa, ayat, latin, artinya } = res.data[0];
        const prayerMessage = new EmbedBuilder()
          .setTitle(`Prayer of Today📿`)
          .addFields([
            { name: "Doa", value: doa.toString() },
            { name: "Ayat", value: ayat.toString() },
            { name: "Latin", value: latin.toString() },
            { name: "Artinya", value: artinya.toString() },
            {
              name: "Sumber Data",
              value:
                "https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/v1/random",
            },
          ])
          .setColor("#4484f1")
          .setFooter({
            text: `Command used by: ${interaction.user.tag}`,
            iconURL: interaction.user.avatarURL(),
          });

        interaction.editReply({ embeds: [prayerMessage] });
      })
      .catch((err) => {
        interaction.editReply(`Error when getting request`);
      });
  },
};
