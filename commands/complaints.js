// Import discord package
const Discord = require('discord.js')
const complaintChannelID = "1073041920550518857"

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('Complaints')
        .setDescription('Do you have a complaint you would like to share?')
        .addStringOption(
            option => option.setName('complainttype')
                            .setDescription('The type of suggestion')
                            .setRequired(true)
                            .addChoices(
                                {name: 'Bot Complaint', value: 'Bot Complaint'},
                                {name: 'Club complaint', value: 'Club Complaint'},
                                {name: 'Misc. complaint', value: 'Misc. Complaint'}
                            )
        )
        .addStringOption(
            option => option.setName('Complaint') 
                            .setDescription('Your complaint')
                            .setRequired(true)
        ),
 
    async execute(interaction){
        // Get option info
        const complainttype = interaction.options.getString('complainttype')
        const complaint = interaction.options.getString('complaint')
        
        // Make reply embed for suggester
        const embed1 = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Complaint review')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setDescription('We are sorry you had to experience trouble in our server. If there was a mistake, please DM Patrick W, the vice president or Kabir J, the CTO. Thanks!\n\u200B')
            .setThumbnail('https://i.imgur.com/r2SHWqW.png')
            .addFields(
                {
                    name: 'Complaint Type', 
                    value: `${complainttype}`
                }
            ) 
            .addFields(
                {
                    name: 'Suggestion', 
                    value: `${complaint}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Suggestion', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })


        await interaction.reply({embeds: [embed1], ephemeral: true})

        // Post suggestion to suggestion channel via embed
        const channel = interaction.guild.channels.cache.get(complaintChannelID)

        const embed2 = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Complaint')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {
                    name: ' ', 
                    value: `**Complaint by:** ${interaction.member.user.tag}\n` + 
                           `**User ID of person:** ${interaction.member.user.id}\n` + 
                           `**Complaint type:** ${suggestiontype}\n` + 
                           `**Complaint:** ${suggestion}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Complaint', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })

        await channel.send({embeds: [embed2]})
    }
}

module.exports = data