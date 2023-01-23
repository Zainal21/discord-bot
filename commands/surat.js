const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

module.exports = {
  name: "Surat",
  data: new SlashCommandBuilder()
    .setName("surat")
    .setDescription("show ayat of alquran!")
    .addStringOption((option) =>
      option.setName("surat").setDescription("surat").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("ayat").setDescription("ayat").setRequired(true)
    ),
  execute: async (interaction) => {
    const _surat = interaction.options.getString("surat").toLowerCase();
    const _ayat = interaction.options.getString("ayat").toLowerCase();
    await interaction.deferReply();
    const suratPath = path.join(appDir, "data/surah");
    const fullPath = path.join(suratPath, `${_surat}.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    if (fileContents) {
      const result = JSON.parse(fileContents);
      const jsonResult = result[_surat];
      console.log(jsonResult.name);
      const SurahEmbeded = new EmbedBuilder()
        .setTitle(`Surah Detail 📖`)
        .addFields([
          {
            name: "Surah",
            value: jsonResult.name + "/" + jsonResult.name_latin,
          },
          {
            name: "Ayat",
            value: jsonResult.text[_ayat],
          },
          {
            name: "Translations",
            value: jsonResult.translations.id.text[_ayat],
          },
        ])
        .setColor("#4484f1")
        .setFooter({
          text: `Command used by: ${interaction.user.tag}`,
          iconURL: interaction.user.avatarURL(),
        });
      interaction.editReply({ embeds: [SurahEmbeded] });
    } else {
      interaction.editReply("⚠️Surah is not found");
    }
  },
};
