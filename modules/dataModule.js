// Import stuff
const Discord = require('discord.js')

// Meeting embed
const meetingEmbed = new Discord.EmbedBuilder() 
    .setColor(Discord.Colors.Blue)
    .setTitle("Meeting information")
    .setAuthor({
        name: "KeyClubBot", 
        iconURL: "https://i.imgur.com/r2SHWqW.png"
    })
    .setDescription("All the information you need for meetings!\n\u200B")
    .setThumbnail("https://i.imgur.com/r2SHWqW.png")
    .addFields(
        {
            name: "Meeting Notes", 
            value: "All the meeting notes can be found [here](https://drive.google.com/drive/folders/1F4rkhILIqrU4RSkWVNX6Alsia-Oq-QPU?usp=share_link)."
        }
    )   
    .setTimestamp()
    .setFooter({
        text: "Meeting information", 
        iconURL: "https://i.imgur.com/r2SHWqW.png"
    })

// Help embed
const helpEmbed = new Discord.EmbedBuilder()
    .setColor(Discord.Colors.Blue)
    .setTitle("KeyClubBot Help")
    .setAuthor({
        name: "KeyClubBot", 
        iconURL: "https://i.imgur.com/r2SHWqW.png"
    })
    .setDescription("This embed should provide you a list of information you need.\n\u200B")
    .setThumbnail("https://i.imgur.com/r2SHWqW.png")
    .addFields(
        {
            name: "Commands", 
            value: "**help** - displays this embed\n" + 
                   "**meetingInfo** - displays information about previous meeting notes, future meetings, etc" 
        }
    ) 
    .setTimestamp()
    .setFooter({
        text: "Key Club help", 
        iconURL: "https://i.imgur.com/r2SHWqW.png"
    })

const data = {
    meetingEmbedData: meetingEmbed,
    helpEmbedData: helpEmbed
}

// Export data
module.exports = data