// src/bot/commands/news.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

let cachedNews = [];
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Fetches the latest stock news'),

    async execute(interaction) {
        await interaction.deferReply();

        const currentTime = Date.now();
        
        // Check if the cached news is still valid
        if (currentTime - lastFetchTime < CACHE_DURATION && cachedNews.length > 0) {
            // Use cached data
            sendEmbed(interaction, cachedNews);
            return;
        }

        try {
            // Fetch the news data from your endpoint
            const response = await axios.get('http://localhost:3000/api/stocks/news');
            cachedNews = response.data; // Cache the news
            lastFetchTime = currentTime; // Update fetch time

            // Send the embed with new data
            sendEmbed(interaction, cachedNews);
        } catch (error) {
            console.error('Error fetching news:', error);
            await interaction.editReply({ content: 'There was an error fetching the news.', ephemeral: true });
        }
    },
};

function sendEmbed(interaction, newsData) {
    const embed = new EmbedBuilder()
        .setTitle('Latest Stock News')
        .setColor('#0099ff')
        .setDescription('News updates every hour.')

    newsData.forEach((news) => {
        embed.addFields({
            name: news.heading,
            value: `[Read more](${news.link})`,
        });
    });

    interaction.editReply({ embeds: [embed] });
}
