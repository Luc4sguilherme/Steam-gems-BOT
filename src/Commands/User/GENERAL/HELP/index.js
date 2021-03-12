const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');

module.exports = (sender, client, users, lang) => {
  const language = lang || users[sender.getSteamID64()].language;

  log.userChat(sender.getSteamID64(), language, '[ !HELP ]');

  chatMessage(client, sender, messages.HELP[language]);

  if (main.tutorial) {
    chatMessage(client, sender, `${main.tutorial}`);
  }
};
