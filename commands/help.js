// Import modules
const Discord = require('discord.js')
const dataModule = require('../modules/dataModule')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays a list of commands"),
    async execute(interaction) {
        await interaction.reply({content: '', embeds: [dataModule.helpEmbedData], ephemeral: true})
    }     
}

module.exports = data;