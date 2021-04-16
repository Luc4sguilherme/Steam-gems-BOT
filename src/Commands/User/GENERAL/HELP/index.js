const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users, lang) => {
  const language = lang || utils.getLanguage(sender.getSteamID64(), users);

  log.userChat(sender.getSteamID64(), language, '[ !HELP ]');

  chatMessage(client, sender, messages.HELP[language]);

  if (main.tutorial) {
    chatMessage(client, sender, `${main.tutorial}`);
  }
};
