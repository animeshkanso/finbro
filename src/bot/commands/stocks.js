// src/bot/commands/stock.js
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stock')
        .setDescription('Fetch stock data by symbol')
        .addStringOption(option => 
            option.setName('symbol')
                .setDescription('The stock symbol to fetch')
                .setRequired(true)
        ),
    async execute(interaction) {
        const stockSymbol = interaction.options.getString('symbol');
        try {
            const response = await axios.get(`http://localhost:${config.port}/api/stocks/${stockSymbol}`);
            const { price, volume } = response.data;
            await interaction.reply(`**${stockSymbol.toUpperCase()}**\nPrice: $${price}\nVolume: ${volume}`);
        } catch (error) {
            await interaction.reply('Error fetching stock data. Please try again later.');
        }
    },
};
