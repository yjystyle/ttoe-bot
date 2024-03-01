const dotenv = require("dotenv");
if (process.env.NODE_ENV === "prd") {
  dotenv.config({ path: ".env.prd" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
{
    name: "떠",
    description: "ㄱㄱ"
},
  {
    name: "상태",
    description: "현재 서버내의 채널별 게임 가능 여부를 알려줍니다.",
  },
  {
    name: "갱신",
    description: "서버내의 채널별 유저정보를 저장합니다.",
  },

//   {
//     name: "시간변경",
//     description: "게임의 시간을 변경합니다.",
//     options: [
//       {
//         name: "시",
//         description: "hour",
//         type: ApplicationCommandOptionType.Integer,
//         required: true,
//       },
//       {
//         name: "분",
//         description: "minutes",
//         type: ApplicationCommandOptionType.Integer,
//         required: true,
//       },
//     ],
//   },
//   {
//     name: "add",
//     description: "Adds two numbers.",
//     options: [
//       {
//         name: "first-number",
//         description: "The first number.",
//         type: ApplicationCommandOptionType.Number,
//         choices: [
//           {
//             name: "one",
//             value: 1,
//           },
//           {
//             name: "two",
//             value: 2,
//           },
//           {
//             name: "three",
//             value: 3,
//           },
//         ],
//         required: true,
//       },
//       {
//         name: "second-number",
//         description: "The second number.",
//         type: ApplicationCommandOptionType.Number,
//         required: true,
//       },
//     ],
//   },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands ...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
