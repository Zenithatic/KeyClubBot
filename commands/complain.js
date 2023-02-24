// Import discord package
const Discord = require('discord.js')
const complaintChannelID = "1073063994400702546"

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('complain')
        .setDescription('Write a complaint about something or someone. An executive will DM you after they have reviewed it.')
        .addStringOption(
            option => option.setName('complainttype')
                            .setDescription('The type of complaint')
                            .setRequired(true)
                            .addChoices(
                                {name: 'User Complaint', value: 'User Complaint'},
                                {name: 'Server Complaint', value: 'Server. Complaint'},
                                {name: 'Misc. Complaint', value: 'Misc. Complaint'}
                            )
        )
        .addStringOption(
            option => option.setName('complaint') 
                            .setDescription('Your complaint')
                            .setRequired(true)
        ),
 
    async execute(interaction){
        // Get option info
        const complainttype = interaction.options.getString('complainttype')
        const complaint = interaction.options.getString('complaint')
        
        // Make reply embed for complainer
        const embed1 = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Complaint review')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setDescription('We are sorry you had to experience trouble in our server. We will now open a ticket channel for discussion. Please find that channel in the server to discuss.
 If there was a mistake in your complaint, please DM Patrick W, the vice president or Kabir J, the CTO. Thanks!\n\u200B')
            .setThumbnail('https://i.imgur.com/r2SHWqW.png')
            .addFields(
                {
                    name: 'Complaint Type', 
                    value: `${complainttype}`
                }
            ) 
            .addFields(
                {
                    name: 'Complaint', 
                    value: `${complaint}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Complaint', 
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
                           `**Complaint type:** ${complainttype}\n` + 
                           `**Complaint:** ${complaint}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Complaint', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })

        await channel.send({embeds: [embed2]})

        // Create separate private channel
        await interaction.guild.channels.create({
            name: 'complaint-ticket-' + interaction.member.id,
            type: Discord.ChannelType.GuildText,
            parent: "1078514773672599733",
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [Discord.PermissionFlagsBits.ViewChannel]
                }
                ,
                {
                    id: interaction.member.id,
                    allow: [
                        Discord.PermissionFlagsBits.ViewChannel, 
                        Discord.PermissionFlagsBits.SendMessages, 
                        Discord.PermissionFlagsBits.ReadMessageHistory, 
                        Discord.PermissionFlagsBits.AttachFiles, 
                        Discord.PermissionFlagsBits.UseExternalEmojis, 
                        Discord.PermissionFlagsBits.MentionEveryone,
                        Discord.PermissionFlagsBits.UseExternalStickers,    
                    ]
                }
            ]
        }).then(async chan => {
            await chan.send({content: "@everyone", embeds: [embed2]})
        })
    }
}

module.exports = data
