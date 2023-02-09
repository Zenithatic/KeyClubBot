const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction){
        await interaction.reply({content: 'pong', ephemeral: false})
    }
}

module.exports = data