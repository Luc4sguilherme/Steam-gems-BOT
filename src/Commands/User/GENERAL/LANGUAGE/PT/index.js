const fs = require('fs');

const log = require('../../../../../Components/log');
const chatMessage = require('../../../../../Components/message');

module.exports = (sender, client, users) => {
  const user = users;
  log.userChat(
    sender.getSteamID64(),
    user[sender.getSteamID64()].language,
    '[ !PT ]'
  );
  user[sender.getSteamID64()].language = 'PT';
  fs.writeFile('./Data/User/Users.json', JSON.stringify(user), (ERR) => {
    if (ERR) {
      log.error(`An error occurred while writing UserData file: ${ERR}`);
    } else {
      chatMessage(client, sender, 'Idioma alterado para Português');
    }
  });
};