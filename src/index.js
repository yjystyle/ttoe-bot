const dotenv = require("dotenv");
// console.log(dotenv);
const db = require("./db");
const moment = require("moment-timezone");
const {
  Client,
  IntentsBitField,
  Embed,
  EmbedBuilder,
  ActivityType,
  SlashCommandBuilder,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionsBitField,
  // MessageButton,
  // MessageEmbed
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
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

function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  db.connection.sync().then(() => {
    console.log("Database connection OK!");
  });
}

client.on("ready", (c) => {
  assertDatabaseConnectionOk();
  // Tags.sync();
  // console.log(`Logged in as ${readyClient.user.tag}!`);

  // console.log(c.user);
  console.log(`✅ ${c.user.tag} is online`);

  cronwork.start();

  // channel_ID를 리스트로 받아서 별도의 채널에 각각 호출하도록 적용
  // const channel_ids =
  // let channel_id_list = channel_list.map((c)=> c.dataValues.channel_id);
  // let channel_id = c.dataValues.channel_id;
  // checkAndSendMessage();
});

function checkAndSendMessage() {
  const { Channel, UserChannel } = db.models;
  Channel.findAll({ attributes: ["channel_id"] }).then((channel_ids) => {
    channel_ids
      .map((x) => x.dataValues["channel_id"])
      .forEach((channelId) => {
        UserChannel.findAll({
          where: { date: getKSTToday(), channelId: channelId },
        }).then((uc) => {
          // ud = uc.dataValues;
          let sendFlag = false;
          let cantMembers = [];
          uc.forEach((x) => {
            // 미정인 경우 압박DM
            if (x.dataValues.status === 2) {
              cantMembers.push(x.dataValues.userId);
              sendFlag = true;
            }
          });
          if (sendFlag) {
            console.log(cantMembers);
            sendMessageToChannel(channelId);
          }

          // cantUserListByChannel = uc.dataValues.filter((x) => x.status ===2);
          // console.log(cantUserListByChannel, channelId);
        });
      });
  });
}
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
let status = ["오늘 가능", "오늘 불가능", "아직"];
let gameStatus = [
  {
    name: "custom_game",
    type: ActivityType.Custom,
    state: `오늘 가능`,
  },
  {
    name: "custom_game",
    type: ActivityType.Custom,
    state: `오늘 불가능`,
  },
  {
    name: "custom_game",
    type: ActivityType.Custom,
    state: "아직 모름",
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

// async function getChannelType(guildId, channelId) {
//   try {
//     // Discord API에서 채널 정보 가져오기
//     const channel = await rest.get(Routes.channel(guildId, channelId));
//     const channelType = channel.type;
//     console.log("Channel Type:", channelType);
//     return channelType;
//   } catch (error) {
//     console.error("Error fetching channel information:", error);
//   }
// }

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
  } else if (interaction.commandName === "상태") {
    const channelCheck = interaction.channel
      .permissionsFor(interaction.guild.roles.everyone)
      .has(PermissionsBitField.Flags.ViewChannel);
    if (channelCheck) return;

    sendStatusMessageToChannel();
    await interaction.reply({
      content: `아래 처럼 대답해드릴 수 있을 것 같습니다.`,
      ephemeral: true,
    });
  } else if (interaction.commandName === "갱신") {
    const channelCheck = interaction.channel
      .permissionsFor(interaction.guild.roles.everyone)
      .has(PermissionsBitField.Flags.ViewChannel);
    if (channelCheck) return;

    const { User, Channel, UserChannel } = db.models;
    // truncate
    // await db.connection.destroyAll();
    await UserChannel.destroy({ truncate: true });
    await Channel.destroy({ truncate: true });
    await User.destroy({ truncate: true });

    // console.log(interaction);
    const guild = interaction.guild;
    await guild.members.fetch();
    const members = guild.members.cache;

    members
      .filter((member) => !member.user.bot)
      .forEach((member) => {
        User.upsert({
          user_id: member.user.id,
          name: member.user.username,
          globalName: member.user.globalName,
          bot: member.user.bot,
        });
      });

    await guild.channels.fetch();
    const channels = guild.channels.cache;

    // let channelFilter = ["general", "로비"];
    const memberIdList = members
      .filter((member) => !member.user.bot)
      .map((member) => member.id);

    channels
      .filter(
        (channel) =>
          !channel
            .permissionsFor(guild.roles.everyone)
            .has(PermissionsBitField.Flags.ViewChannel)
      )
      .filter((channel) => channel.type === 0)
      .forEach((channel) => {
        // console.log('여기까지 얼마나 오냐?', channel.name);
        Channel.upsert({
          channel_id: channel.id,
          channel_name: channel.name,
          game_name: channel.name,
        });

        memberIdList
          .filter((memberId) =>
            channel
              .permissionsFor(memberId)
              .has(PermissionsBitField.Flags.ViewChannel)
          )
          .forEach((memberId) => {
            console.log(
              channel.name,
              channel
                .permissionsFor(memberId)
                .has(PermissionsBitField.Flags.ViewChannel)
            );
            UserChannel.upsert({
              date: getKSTToday(),
              userId: memberId,
              channelId: channel.id,
            });
          });
      });

    // Iterate over each member/user and log their username and ID

    await interaction.reply({
      content: `${guild.name}내의 모든 유저 정보가 갱신되었습니다.`,
      ephemeral: true,
    });
  } else if (interaction.commandName === "떠") {
    const channelCheck = interaction.channel
      .permissionsFor(interaction.guild.roles.everyone)
      .has(PermissionsBitField.Flags.ViewChannel);
    if (channelCheck) return;

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`오늘 ${interaction.channel.name} 가능?`);
    // .setDescription(`${notDecisionUsers} 하면 함.`);
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("0")
        .setLabel("가능")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("1")
        .setLabel("불가능")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("2")
        .setLabel("아직모름")
        .setStyle(ButtonStyle.Primary)
    );
    interaction.reply({ embeds: [embed], components: [row] });
  }
});

// let sendDm = function() {
//   const
// }
let sendStatusMessageToChannel = function () {
  const { Channel, UserChannel, User } = db.models;
  Channel.findAll().then((channel_list) => {
    channel_list.forEach(async (c) => {
      // console.log(c);
      let channel_id = c.dataValues.channel_id;
      let channel = await client.channels.cache.get(channel_id);
      let channel_name = c.dataValues.channel_name;

      // 조인문 필요
      const userChannels = await UserChannel.findAll({
        include: [{ model: User }, { model: Channel }],
        where: { date:getKSTToday(), channelId: channel_id }, // 채널 ID 조건 추가
      });

      let canGameFlag = getCanGameFlag(userChannels);
      // let userStatusList = [];
      if (canGameFlag == 0) {
        const embed = new EmbedBuilder()
          .setColor("#75f62e")
          .setTitle(`${channel_name} 쌉가능한 상태`)
          .setDescription("ㅃㄹ");
        channel.send({ embeds: [embed] });
      } else if (canGameFlag == 2) {
        const notDecisionUsers = userChannels
          .filter((userChannel) => userChannel.dataValues.status === 2)
          .map(
            (userChannel) =>
              userChannel.user.globalName ?? userChannel.user.name
          )
          .join(", ");
        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(`${notDecisionUsers}에 달려 있음`)
          .setDescription(`${notDecisionUsers} 하면 함.`);
        channel.send({ embeds: [embed] });
      } else {
        const cantGameUsers = userChannels
          .filter((userChannel) => userChannel.dataValues.status === 1)
          .map(
            (userChannel) =>
              userChannel.user.globalName ?? userChannel.user.name
          )
          .join(", ");
        const embed = new EmbedBuilder()
          .setColor("#ff2701")
          .setTitle(`${channel_name} 사실상 불가능`)
          .setDescription(`${cantGameUsers} 때문에 불가능`);
        channel.send({ embeds: [embed] });
      }
    });
  });

  // let channels = channel_list.map((c)=> c.dataValues.channel_id);
};

let sendMessageToChannel = function (channelId) {
  const { Channel, UserChannel, User } = db.models;
  let resultPromise = null;
  if (channelId) {
    // console.log("채널 한개 가져옴");
    resultPromise = Channel.findAll({ where: { channel_id: channelId } });
  } else {
    // console.log("전체 가져옴");
    resultPromise = Channel.findAll();
  }

  resultPromise.then((channel_list) => {
    channel_list.forEach(async (c) => {
      // console.log(c);
      let channel_id = c.dataValues.channel_id;
      let channel = await client.channels.cache.get(channel_id);
      let channel_name = c.dataValues.channel_name;

      // 조인문 필요
      const userChannels = await UserChannel.findAll({
        include: [{ model: User }, { model: Channel }],
        where: { date:getKSTToday(), channelId: channel_id }, // 채널 ID 조건 추가
      });

      let canGameFlag = getCanGameFlag(userChannels);
      if (canGameFlag == 0) {
        const embed = new EmbedBuilder()
          .setColor("#75f62e")
          .setTitle(`오늘 ${channel_name} 쌉가능한 상태`)
          .setDescription("ㅃㄹ");
        channel.send({ embeds: [embed] });
      } else if (canGameFlag == 2) {
        const notDecisionUsers = userChannels
          .filter((userChannel) => userChannel.dataValues.status === 2)
          .map(
            (userChannel) =>
              userChannel.user.globalName ?? userChannel.user.name
          )
          .join(", ");
        const embed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(`오늘 ${channel_name} 가능?`)
          .setDescription(`${notDecisionUsers} 하면 함.`);
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("0")
            .setLabel("가능")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("1")
            .setLabel("불가능")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("2")
            .setLabel("아직모름")
            .setStyle(ButtonStyle.Primary)
        );
        channel.send({ embeds: [embed], components: [row] });
      } else {
        const cantGameUsers = userChannels
          .filter((userChannel) => userChannel.dataValues.status === 1)
          .map(
            (userChannel) =>
              userChannel.user.globalName ?? userChannel.user.name
          )
          .join(", ");
        const embed = new EmbedBuilder()
          .setColor("#ff2701")
          .setTitle(`${channel_name} 사실상 불가능`)
          .setDescription(`${cantGameUsers} 때문에 불가능`);
        channel.send({ embeds: [embed] });
      }
    });
  });

  // let channels = channel_list.map((c)=> c.dataValues.channel_id);
};

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    // await interaction.deferReply({ ephemeral: true });
    // let channel = interaction.channels.cache;
    // console.log(channel);
    const username = interaction.user.globalName;
    if (interaction.customId === "0") {
      changeStatus(interaction);

      // 전체 가능한지 확인
      // 조인문 필요
      const { UserChannel, User, Channel } = db.models;
      const userChannels = await UserChannel.findAll({
        include: [{ model: User }, { model: Channel }],
        where: { date:getKSTToday(), channelId: interaction.channel.id }, // 채널 ID 조건 추가
      });
      let canGameFlag = getCanGameFlag(userChannels);
      if (canGameFlag === 0) {
        const embed = new EmbedBuilder()
          .setColor("#75f62e")
          .setTitle(`${interaction.channel.name} 쌉가능한 상태`)
          .setDescription("ㅃㄹ");
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply(`${username} - 굿 결정`);
      }

      // changeStatus(interaction);
    } else if (interaction.customId === "1") {
      changeStatus(interaction);

      await interaction.reply(`${username} - 족볍이`);
      // changeStatus(interaction);
    } else {
      changeStatus(interaction);

      await interaction.reply(`${username} - 결정되면 다시 응답해주세요.`);
    }
  } catch (error) {
    console.log(error);
  }
});

let changeStatus = async function (interaction) {
  const { UserChannel } = db.models;
  let userId = interaction.user.id;
  let channelId = interaction.channel.id;
  console.log(getKSTToday(), channelId, userId);
  const newData = {
    status: interaction.customId,
  };
  const condition = {
    where: {
      date: getKSTToday(),
      channelId: channelId,
      userId: userId,
    },
  };
  // const data = await UserChannel.create({date: getKSTToday(), channelId: channelId, userId : userId});
  UserChannel.update(newData, condition)
    .then((result) => {
      console.log("Update Successful:", result); // 업데이트된 레코드 수 등의 정보가 포함됩니다.
    })
    .catch((error) => {
      console.error("Error occurred during update:", error);
    });
};

let reschedule = function (input) {
  a.setTime(new CronTime(input));
};

let scheduledTime = "0 10 * * *"; // 초기 스케쥴러 시간 (매일 오후 2시 30분)
const cronwork = new CronJob(
  scheduledTime,
  function () {
    checkAndSendMessage();
  },
  null,
  false
);
const getCanGameFlag = function (userChannels) {
  // 모두가 0이면
  let userStatusList = userChannels.map(
    (userChannel) => userChannel.dataValues.status
  );
  let allTwos = userStatusList.every((x) => x === 0);
  if (allTwos) {
    return 0;
    // 1은 없지만 그래도 2가 있는 경우
  } else if (userStatusList.includes(2) && !userStatusList.includes(1)) {
    return 2;
  } else {
    return 1;
  }
};
const getKSTToday = function () {
  // 현재 시각을 KST로 변환하여 가져옵니다.
  const kstNow = moment().tz("Asia/Seoul");
  // KST로 변환된 시간을 yyyymmdd 형식으로 포맷팅합니다.
  const yyyymmddKST = kstNow.format("YYYYMMDD");
  return yyyymmddKST;
};

if (process.env.NODE_ENV === "prd") {
  dotenv.config({ path: ".env.prd" });
} else {
  dotenv.config({ path: ".env.dev" });
}

client.login(process.env.TOKEN);
