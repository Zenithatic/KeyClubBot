const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName("closeticket")
        .setDescription("Closes the ticket this command was used in.")
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator),
    async execute(interaction){
        var channel = interaction.channel
        if (channel.name.startsWith("complaint-ticket") || (channel.name.startsWith("suggest-ticket"))){
            await interaction.guild.channels.delete(channel.id, "closing ticket")
        }
        else{
            interaction.reply({content: "This channel is not a ticket!", ephemeral: true})
        }

    }


}

module.exports = data