const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('say')
        .setDescription('allows the bulk deletion of a custom number of messages')
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addChannelOption(option => 
            option.setName('channel')
                  .setDescription('channel where bot will say something')
                  .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('text')
                  .setDescription('text to say')
                  .setRequired(true)   
        ),

    async execute(interaction){
        const channel = interaction.options.getChannel('channel')
        const text = interaction.options.getString('text')

        await channel.send({content: text})

        await interaction.reply({content: "Message done.", ephemeral: true})
    }
}

module.exports = data