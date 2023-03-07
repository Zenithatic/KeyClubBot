const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('say')
        .setDescription('let the bot say something')
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
        )
        .addAttachmentOption(option => 
            option.setName('image')
            .setDescription('image to upload')
            .setRequired(true)
        ),
    async execute(interaction){
        const channel = interaction.options.getChannel('channel')
        const text = interaction.options.getString('text')
        const image = interaction.options.getAttachment('image')
        const attch = new Discord.AttachmentBuilder(image.proxyURL)


        await channel.send({content: text, files: [attch]})

        await interaction.reply({content: "Message done.", ephemeral: true})
        await setTimeout(() => interaction.deleteReply(), 5000)
    }
}

module.exports = data