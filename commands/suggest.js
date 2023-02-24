// Import discord package
const Discord = require('discord.js')
const suggestionChannelID = "1073041920550518857"

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest something new for the club/bot. An executive will DM you after they have reviewed it.')
        .addStringOption(
            option => option.setName('suggestiontype')
                            .setDescription('The type of suggestion')
                            .setRequired(true)
                            .addChoices(
                                {name: 'Bot suggestion', value: 'Bot suggestion'},
                                {name: 'Club suggestion', value: 'Club suggestion'},
                                {name: 'Misc. suggestion', value: 'Misc. suggestion'}
                            )
        )
        .addStringOption(
            option => option.setName('suggestion') 
                            .setDescription('Your suggestion')
                            .setRequired(true)
        ),
 
    async execute(interaction){
        // Get option info
        const suggestiontype = interaction.options.getString('suggestiontype')
        const suggestion = interaction.options.getString('suggestion')
        
        // Make reply embed for suggester
        const embed1 = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Suggestion review')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setDescription('Thanks for suggesting! To verify, here is your suggestion information. If there was a mistake in your suggestion, please DM Patrick W, the vice president or Kabir J., the CTO. Thanks!\n\u200B')
            .setThumbnail('https://i.imgur.com/r2SHWqW.png')
            .addFields(
                {
                    name: 'Suggestion Type', 
                    value: `${suggestiontype}`
                }
            ) 
            .addFields(
                {
                    name: 'Suggestion', 
                    value: `${suggestion}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Suggestion', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })


        await interaction.reply({embeds: [embed1], ephemeral: true})

        // Post suggestion to suggestion channel via embed
        const channel = interaction.guild.channels.cache.get(suggestionChannelID)

        const embed2 = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Suggestion')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {
                    name: ' ', 
                    value: `**Suggestion by:** ${interaction.member.user.tag}\n` + 
                           `**User ID of person:** ${interaction.member.user.id}\n` + 
                           `**Suggestion type:** ${suggestiontype}\n` + 
                           `**Suggestion:** ${suggestion}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Suggestion', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })

        await channel.send({embeds: [embed2]})

        // Create separate private channel
        await interaction.guild.channels.create({
            name: 'suggest-ticket-' + interaction.member.id,
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