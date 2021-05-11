const process = require('process');
const kill = require('tree-kill');

const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');

module.exports = (sender, client, users) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);

  chatMessage(client, sender, messages.REQUEST[language]);
  log.adminChat(sender.getSteamID64(), language, '[ !DIE ]');
  kill(process.ppid);
};
