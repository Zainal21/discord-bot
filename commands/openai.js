require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
  name: "question",
  data: new SlashCommandBuilder()
    .setName("question")
    .setDescription("Answer Of Quetion based on Open AI Api")
    .addStringOption((option) =>
      option.setName("quetions").setDescription("Quetions").setRequired(true)
    ),
  execute: async (interaction) => {
    const _question = interaction.options.getString("quetions");
    await interaction.deferReply();
    const configuration = new Configuration({
      apiKey: process.env.API_KEY_OPENAI,
    });
    const openai = new OpenAIApi(configuration);
    const answer = await openai.createCompletion({
      model: "davinci",
      prompt: _question,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let _answer = answer.data.choices[0].text;
    const answerQuetion = new EmbedBuilder()
      .setTitle(`Answer of the quetion📗`)
      .addFields([
        {
          name: "Answer",
          value: _answer,
        },
        {
          name: "Sumber Data",
          value: "https://api.openai.com/v1/engines/davinci/completions",
        },
      ])
      .setColor("#4484f1")
      .setFooter({
        text: `Command used by: ${interaction.user.tag}`,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.editReply({ embeds: [answerQuetion] });
  },
};
