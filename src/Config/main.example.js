module.exports = {
  // Bot Steam Username
  userName: '',

  // Bot Steam Password
  passWord: '',

  // Bot Steam ID64
  steamID: '',

  // Bot Shared Secret for your Bot account (SDA)
  sharedSecret: '',

  // Bot Identity Secret for your Bot account (SDA)
  identitySecret: '',

  // You can add multiple Administrators - example [ "SteamID64", "SteamID64" ]
  admins: [''],

  // Owners Profile link
  owner: '',

  // Video tutorial
  tutorial: '',

  // Leave blank to use local computer time
  timeZone: 'America/Sao_Paulo',

  // Set to true if you want bot to accept any donations  (true or false)
  acceptDonations: true,

  // Setup the commands you want the bot to ignore
  ignoreCommands: [''],

  // Setup the currencies you want the bot to accept
  acceptedCurrencies: {
    TF2: true,
    CSGO: true,
    HYDRA: true,
  },

  // Set to true if you want to handle suppliers (!SELL commands).
  handleSuppliers: true,

  // Setup the languages you want the bot to accept. Values ( true or false or 'DEFAULT' )
  // Set the value to 'DEFAULT' to be the primary language
  acceptedLanguages: {
    EN: 'DEFAULT',
    PT: true,
    ES: true,
    FR: true,
    DE: true,
    RU: true,
    JA: true,
    CN: true,
  },

  steamGroup: {
    // Set to true if you want to invite customers to a desired GroupID64
    doInvites: true,
    // Target Group link
    link: '',
    // Target Group ID64
    ID: '',
    // if you want to auto refuse all group invites, set this to true
    refuseInvites: true,
  },

  // If you want to automatically add rates to the bot name on startups, set to true, false otherwise. (It is necessary to define the botName variable)
  ratesInBotName: {
    status: false,
    currency: 'CSGO',
  },

  // Defines the name of the BOT on initializations.
  botName: '',

  // Set to true if you want to be warned in your steam chat about every sell/buy bot does
  getTradeMessages: true,

  comment: {
    // Set to true if you want the bot to comment on customers profile
    enabled: true,
    // Interval between user profile comments after negotiation. (in hours)
    interval: 24,
  },

  // Max days an customer can be on friend list without interact with bot.
  maxDaysAdded: 180,

  // The amount of messages users can send every second without getting removed.
  maxMsgPerSec: 2,

  // Max amount of keys that will be allowed in a trade
  maxBuy: 250,
  maxSell: 100,

  // Max amount that will be allowed in check commands
  maxCheck: {
    csgo: 1000,
    tf: 1000,
    hydra: 1000,
  },

  // Set to true to display logs, although even if this is false, logs will be saved on history folder...
  log: {
    warn: {
      enabled: true,
      color: 'yellowBright',
    },
    error: {
      enabled: true,
      color: 'redBright',
    },
    info: {
      enabled: true,
      color: 'greenBright',
    },
    userChat: {
      enabled: true,
      color: 'whiteBright',
    },
    adminChat: {
      enabled: true,
      color: 'blackBright',
    },
    tradeOffer: {
      enabled: true,
      color: 'blueBright',
    },
  },
};
