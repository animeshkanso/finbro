// src/bot/bot.js

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.data.name, command);
    }

    client.once('ready', async () => {
        console.log('Bot is online!');
        const guildId = '1298318879038378145';
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
            await guild.commands.set(client.commands.map(cmd => cmd.data));
            console.log('Registered guild commands');
        } else {
            console.error('Guild not found');
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    });

    client.login(config.discordToken);
}

module.exports = startBot;
