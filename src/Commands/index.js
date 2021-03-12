const main = require('../Config/main');
const Admin = require('./Admin');
const Unknow = require('./Unknow');
const User = require('./User');

function commands(sender, msg, client, users, community, manager) {
  if (main.admins.includes(sender.getSteamID64())) {
    if (
      Admin(sender, msg, client, users, community, manager) === 'UNKNOW' &&
      User(sender, msg, client, users, community, manager) === 'UNKNOW'
    ) {
      Unknow(sender, client, users);
    }
  } else if (
    User(sender, msg, client, users, community, manager) === 'UNKNOW'
  ) {
    Unknow(sender, client, users);
  }
}
module.exports = commands;
