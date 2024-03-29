const fs = require('graceful-fs');

const log = require('../../../../../Components/log');
const chatMessage = require('../../../../../Components/message');
const utils = require('../../../../../Utils');

module.exports = (sender, client, users) => {
  const user = users;
  log.userChat(
    sender.getSteamID64(),
    utils.getLanguage(sender.getSteamID64(), user),
    '[ !DE ]'
  );
  user[sender.getSteamID64()].language = 'DE';
  fs.writeFile('./Data/User/Users.json', JSON.stringify(user), (ERR) => {
    if (ERR) {
      log.error(`An error occurred while writing UserData file: ${ERR}`);
    } else {
      chatMessage(client, sender, 'Sprache auf Deutsch geändert');
    }
  });
};
