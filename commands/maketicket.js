const Discord = require('discord.js')
const { execute } = require( './complain' )

data = {
    data: new Discord.SlashCommandBuilder()
        .setName('maketicket')
        .setDescription('creates a private ticket for discussion')
        .addStringOption(option =>
            option.setName('topic')
                  .setDescription('the topic the ticket is about')
                  .setRequired(true)

        )
        .addUserOption(option => 
            option.setName('otheruser')
                  .setDescription('add another user to the ticket if you want (this function is mainly for admins)')
                  .setRequired(false)
        ),
    async execute(interaction){
        const otheruser = interaction.options.getUser('otheruser')
        const topic = interaction.options.getString('topic')

        // create embed for user
        const userEmbed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Ticket Details')
            .setDescription('This is what your ticket looks like. Now, please go find the ticket channel that has been made under the TICKETS channel category.')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {
                    name: ' ', 
                    value: `**Ticket made by:** ${interaction.member.user.tag}\n` + 
                           `**User ID of person:** ${interaction.member.user.id}\n` + 
                           `**Ticket topic:** ${topic}\n` + 
                           `**Other user:** ${otheruser}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Ticket', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })    
        
        await interaction.reply({embeds: [userEmbed], ephemeral: true})

        // create embed for new ticket
        const ticketEmbed = new Discord.EmbedBuilder()
            .setColor(Discord.Colors.Blue)
            .setTitle('Ticket')
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {
                    name: ' ', 
                    value: `**Ticket made by:** ${interaction.member.user.tag}\n` + 
                           `**User ID of person:** ${interaction.member.user.id}\n` + 
                           `**Ticket topic:** ${topic}\n` + 
                           `**Other user:** ${otheruser}`
                }
            ) 
            .setTimestamp()
            .setFooter({
                text: 'Key Club Ticket', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })

        await interaction.guild.channels.create({
            name: 'user-ticket-' + interaction.member.id,
            type: Discord.ChannelType.GuildText,
            parent: "1078514773672599733",
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [Discord.PermissionFlagsBits.ViewChannel]
                },
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
            await chan.send({content: "@everyone", embeds: [ticketEmbed]})

            if (otheruser != null){
                await chan.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [Discord.PermissionFlagsBits.ViewChannel]
                    },
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
                    },
                    {
                        id: otheruser,
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
                ])
            }
        })
    }
}

module.exports = data