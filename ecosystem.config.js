module.exports = {
    apps : [{
      name: "tteo-bot",
      script: "./src/index.js",
      watch: [
          "src",
      ],
      ignore_watch: [".env*", "*.sqlite"]
    }]
  }