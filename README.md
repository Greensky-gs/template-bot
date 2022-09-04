# template-bot
This is the code of a template discord bot in v14 made in typescript (because typescript is the best :))
This bot has no database, and it works with slash commands only.

# Features
This template bot for Discord.js v14 in typescript have some features :

### Commands
* [kick](./src/commands/kick.ts)
* [ban](./src/commands/ban.ts)
* [mute](./src/commands/mute.ts)
* [banlist](./src/commands/banlist.ts)

### Features
* antispam

## Initialisation
First, you need to use the `.env` file and fill it like so :

```
# Theses two are required
token=your bot's token
guild=your guild id
antispam=true or false

# Theses are optionnal
joinChannel=your joins channel id
leaveChannel=your leaves channel id
antispamMaxCount=max messages before mute
antispamTime=time in second before reseting
```

Once it's done, you can take a look to the files and custom them a bit, if you want.
Else, you still can use the [contents.ts](./src/assets/contents.ts) file and custom it.

#### Custom contents.ts
You can custom the [contents.ts](./src/assets/contents.ts) file if you want.
Every embed has this form :
```ts
export function joinEmbed(user) {
    return generateData(basic(user)
        .setTitle("New member")
        .setDescription(`<@${user.id}> just joined !`)
        .setColor('Orange')
    );
};
```

But you also can make it as a string like so :
```ts
export function classic(user) {
    return generateData(`<@${user.id}> just joined !`)
}
```

#### Then, you need to install dependencies
In this repository, I'll use yarn. If you have not yarn, run this command before :
`npm install -g yarn`

Then use this command to install dependencies :
`yarn install`

Finally, you'll have to compile the code, by using this command :
`yarn run build`

A `dist` folder will appear, it is the folder with bot's code.
You have to use **every single file**, exept the ones in `src` folder, because it were transformed into `dist`

#### Run the bot
To run the bot, simply use this command :
`yarn run start`

## Support
If you need any help, contact me [on discord](https://discord.gg/fHyN5w84g6)