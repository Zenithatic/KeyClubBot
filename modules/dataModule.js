// Import stuff
const Discord = require('discord.js')

// Meeting embed
const meetingEmbed = new Discord.EmbedBuilder() 
    .setColor(Discord.Colors.Blue)
    .setTitle('Meeting information')
    .setAuthor({
        name: 'KeyClubBot', 
        iconURL: 'https://i.imgur.com/r2SHWqW.png'
    })
    .setDescription('All the information you need for meetings!\n\u200B')
    .setThumbnail('https://i.imgur.com/r2SHWqW.png')
    .addFields(
        {
            name: 'Meeting Notes', 
            value: 'All the meeting plans, notes, etc can be found [here](https://drive.google.com/drive/folders/1F4rkhILIqrU4RSkWVNX6Alsia-Oq-QPU?usp=share_link).'
        }
    )   
    .setTimestamp()
    .setFooter({
        text: 'Meeting information', 
        iconURL: 'https://i.imgur.com/r2SHWqW.png'
    })

// Help embed
const helpEmbed = new Discord.EmbedBuilder()
    .setColor(Discord.Colors.Blue)
    .setTitle('Key Club Help')
    .setAuthor({
        name: 'KeyClubBot', 
        iconURL: 'https://i.imgur.com/r2SHWqW.png'
    })
    .setDescription('This embed should provide you a list of information you need.\n\u200B')
    .setThumbnail('https://i.imgur.com/r2SHWqW.png')
    .addFields(
        {
            name: 'KeyClubBot Commands', 
            value: '**/help** - displays this embed\n' + 
                   '**/meetinginfo** - displays information about previous meeting notes, future meetings, etc\n' +
                   '**/ping** - a test command to see if the bot is online\n' + 
                   '**/suggest** - provide a suggestion for the executives of the club to review & opens a ticket for further discussion\n' + 
                   '**/complain** - provide a complaint for the executives of the club to review & opens a ticket for further discussion\n'
        }
    ) 
    .addFields(
        {
            name: '\u200B\nWhat is Key Club?', 
            value: 'Key Club is an international, student-led organization that provides its members with opportunities to provide service, build character and develop leadership. Basically Key Club aims to cooperate with school principals and teachers to provide high school students with invaluable experience in living and working together and to prepare them for useful citizenship. Our members develop initiative and leadership skills by serving their schools and communities. '
        }
    ) 
    .setTimestamp()
    .setFooter({
        text: 'Key Club help', 
        iconURL: 'https://i.imgur.com/r2SHWqW.png'
    })

const data = {
    meetingEmbedData: meetingEmbed,
    helpEmbedData: helpEmbed
}

// Export data
module.exports = data