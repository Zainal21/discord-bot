const axios = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core-discord");

module.exports = {
  name: "Murotal",
  data: new SlashCommandBuilder()
    .setName("murotal")
    .setDescription("show murotal ayat of alquran!")
    .addStringOption((option) =>
      option.setName("surat").setDescription("surat").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("ayat").setDescription("ayat").setRequired(true)
    ),
  execute: async (interaction) => {
    const _surat = interaction.options.getString("surat").toLowerCase();
    const _ayat = interaction.options.getString("ayat").toLowerCase();
    const _endpoint = `https://api.quran.gading.dev/surah/${_surat}/${_ayat}`;
    await interaction.deferReply();
    axios
      .get(_endpoint)
      .then(async (res) => {
        let connection = getVoiceConnection(interaction.member.guild.id);

        if (!connection) {
          connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.member.guild.id,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
            selfDeaf: false,
          });
          let audio = res?.data?.data?.audio?.primary;
          if (audio == undefined) {
            interaction.editReply(`Audio Murotal Mp3 Not Found`);
          } else {
            const { meta, tafsir } = res.data.data;
            const { name } = res.data.data.surah;
            const createAudioPlayerEmbeded = new EmbedBuilder()
              .setTitle(`Detail Surah 📖`)
              .addFields([
                {
                  name: "Surah",
                  value: name.short,
                  inline: true,
                },
                { name: "juz", value: `${meta.juz}`, inline: true },
                { name: "tafsir", value: `${tafsir.id.short}` },
                {
                  name: "Sumber Data",
                  value: "https://api.quran.gading.dev/",
                },
              ])
              .setColor("#4484f1")
              .setFooter({
                text: `Command used by: ${interaction.user.tag}`,
                iconURL: interaction.user.avatarURL(),
              });

            const player = createAudioPlayer();
            const resource = createAudioResource(audio, { inlineVolume: true });
            connection.subscribe(player);
            player.play(resource);
            interaction.editReply({ embeds: [createAudioPlayerEmbeded] });
          }
        } else {
          connection.rejoin();
        }
      })
      .catch((error) => {
        interaction.editReply(`${error}`);
      });
  },
};
