const log = require('../../../../Components/log');
const { restart } = require('../../../../Components/login');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');

module.exports = (sender, client, users) => {
  chatMessage(
    client,
    sender,
    messages.REQUEST[users[sender.getSteamID64()].language]
  );
  log.adminChat(
    sender.getSteamID64(),
    users[sender.getSteamID64()].language,
    '[ !RESTART ]'
  );
  chatMessage(
    client,
    sender,
    messages.RESTART[users[sender.getSteamID64()].language]
  );
  restart(client);
};
