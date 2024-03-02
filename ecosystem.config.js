module.exports = {
  apps: [
    {
      name: "tteo-bot",
      script: "npm run prd",
      watch: ["src"],
      ignore_watch: ["node_moduels", ".env*", "*.sqlite"],
    },
    {
      name: "tteo-bot-test",
      script: "npm run dev",
      watch: ["src"],
      ignore_watch: ["node_moduels", ".env*", "*.sqlite"],
    },
  ],
};
