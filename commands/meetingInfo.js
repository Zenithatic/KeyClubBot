// Import modules
const Discord = require('discord.js')
const dataModule = require('../modules/dataModule')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName("meetinginfo")
        .setDescription("Provides the link to the meeting notes, plans, etc"),
    async execute(interaction) {
        await interaction.reply({content: '', embeds: [dataModule.meetingEmbedData], ephemeral: false})
    }     
}

module.exports = data;