const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('bulkdelete')
        .setDescription('allows the bulk deletion of a custom number of messages')
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addNumberOption(
            option => option.setName("messages")
                            .setDescription("number of messages to delete")
                            .setRequired(true)
            )
        ,
    async execute(interaction){
        msgsToDelete = interaction.options.getNumber("messages")
        await interaction.channel.bulkDelete(msgsToDelete)
        await interaction.reply({content: `successful deletion of ${msgsToDelete} messages.`, ephemeral: true})
    }
}

module.exports = data