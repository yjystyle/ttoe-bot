require("dotenv").config();
const {
  Client,
  IntentsBitField,
  Embed,
  EmbedBuilder,
  ActivityType,
  SlashCommandBuilder,
  GatewayIntentBits,
} = require("discord.js");
const cron = require("cron");
const CronJob = cron.CronJob;
const CronTime = cron.CronTime;
const client = new Client({
  fetchAllMembers: true,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online`);
  a.start();
});

/*
client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content == "hello") {
    message.reply("hello too.");
  }
  // console.log(message.content);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  if (interaction.commandName === "hey") {
    interaction.reply("hey!");
  }
  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number")?.value;
    const num2 = interaction.options.get("second-number")?.value;
    interaction.reply(`The sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("embed title")
      .setDescription("This is an embed desctipion")
      .setColor("Random")
      .addFields({
        name: "Field title",
        value: "Some random value",
        inline: true,
      },{
        name: "2nd title",
        value: "Some random value",
        inline: true,
      });
    interaction.reply({ embeds: [embed] });
  }
});

client.on('messageCreate', (message)=>{
  if (message.content === 'embed'){
    const embed = new EmbedBuilder()
      .setTitle("embed title")
      .setDescription("This is an embed desctipion")
      .setColor("Random")
      .addFields({
        name: "Field title",
        value: "Some random value",
        inline: true,
      },{
        name: "2nd title",
        value: "Some random value",
        inline: true,
      });
      message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
});

let status = [
  {
    name: "FreeStyle Football R",
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=LfaMVlDaQ24',  
  },
  {
    name: 'Custom Status 1',
  },
  {
    name: 'Custom Status 2',
    type: ActivityType.Watching,
  },
  {
    name: 'Custom Status 3',
    type: ActivityType.Listening,
  }
]

// emoji : contrl + command + space
client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000)
});
*/

// function sendMessage(){
//   const guild = client.guilds.cache.get(process.env.GUILD_ID);
//   if(guild && guild.channels.cache.get(process.env.CHANNEL_ID)){
//       guild.channels.cache.get(process.env.CHANNEL_ID).send("Good Morning");
//   }
// }

let gameStatus = [
  {
    name: "FreeStyle Football R",
    type: ActivityType.Custom,
    state: `오늘 가능`,
  },
  {
    name: "FreeStyle Football R",
    type: ActivityType.Custom,
    state: `오늘 불가능`,
  },
  {
    name: "FreeStyle Football R",
    type: ActivityType.Custom,
    state: "아직",
  },
];
/** 
client.on("ready", (c) => {
  // console.log(`✅ ${c.user.tag} is online.`);
  setInterval(() => {
    let random = Math.floor(Math.random() * gameStatus.length);
    let status = gameStatus[random];
    client.user.setActivity(gameStatus[random]);
  }, 10000);
});
*/

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "시간변경") {
    const hour = interaction.options.get("시")?.value;
    const minute = interaction.options.get("분")?.value;

    scheduledTime = `${minute} ${hour} * * *`;
    await interaction.reply({
      content: `Scheduler time set to ${hour}:${minute}`,
      ephemeral: true,
    });
    reschedule(scheduledTime);
  }
});

let sendMessageToChannel = function () {
  let channel = client.channels.cache.get(process.env.CHANNEL_ID);
  channel.send("메시지 보냅니다.");
};

let reschedule = function (input) {
  a.setTime(new CronTime(input));
};

let scheduledTime = "42 7 * * *"; // 초기 스케쥴러 시간 (매일 오후 2시 30분)
const a = new CronJob(scheduledTime, function (){
  sendMessageToChannel();
}, null, false);

client.login(process.env.TOKEN);
