const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('joke')
        .setDescription('provides a family friendly joke')
        .addStringOption(
            option => option.setName('type')
                            .setDescription('type of joke requested')
                            .setRequired(true)
                            .addChoices(
                                {name: 'Any', value: 'Any'},
                                {name: 'Programming', value: 'Programming'},
                                {name: 'Pun', value: 'Pun'},
                                {name: 'Spooky', value: 'Spooky'},
                                {name: 'Christmas', value: 'Christmas'},
                                {name: 'Miscellaneous', value: 'Miscellaneous'},
                            )                            
        ),
    async execute(interaction){
        const jokeType = interaction.options.getString('type')

        // prepare http request
        var reqString = 'https://v2.jokeapi.dev/joke/' + jokeType + '?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
        const joke = await fetch(reqString).then((res) => res.json())
        
        // format and send joke
        if (joke.type == 'twopart'){
            var jokeString = ""

            jokeString += joke.setup
            jokeString += "\n\n"
            jokeString += joke.delivery

            await interaction.reply(jokeString)
        }
        else if (joke.type == 'single'){
            await interaction.reply(joke.joke)
        }
    }
}


module.exports = data