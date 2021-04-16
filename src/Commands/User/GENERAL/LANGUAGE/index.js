const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, client, users) => {
  log.userChat(
    sender.getSteamID64(),
    `${utils.getLanguage(sender.getSteamID64(), users)}`,
    '[ !LANG ]'
  );
  let message = '';
  for (
    let i = 0;
    i <
    messages.LANGUAGE[utils.getLanguage(sender.getSteamID64(), users)].length;
    i += 1
  ) {
    message +=
      messages.LANGUAGE[utils.getLanguage(sender.getSteamID64(), users)][i];
  }

  message = `/pre ${filterCommands(message).join('\n')}`;
  chatMessage(client, sender, message);
};
