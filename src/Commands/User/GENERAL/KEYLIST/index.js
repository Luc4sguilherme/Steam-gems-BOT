const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');
const { removeKeys } = require('../../../../Utils');

module.exports = (sender, client, users) => {
  log.userChat(
    sender.getSteamID64(),
    utils.getLanguage(sender.getSteamID64(), users),
    '[ !KEYLIST ]'
  );
  let message = '';
  message +=
    messages.KEYLIST.MESSAGES[0][
      utils.getLanguage(sender.getSteamID64(), users)
    ];

  if (main.acceptedCurrencies.CSGO || main.acceptedCurrencies.HYDRA) {
    message +=
      messages.KEYLIST.MESSAGES[1][
        utils.getLanguage(sender.getSteamID64(), users)
      ];
    for (
      let i = 0;
      i <
      messages.KEYLIST.ACCEPTED.CSGO[
        utils.getLanguage(sender.getSteamID64(), users)
      ].length;
      i += 1
    ) {
      message +=
        messages.KEYLIST.ACCEPTED.CSGO[
          utils.getLanguage(sender.getSteamID64(), users)
        ][i];
    }
  }

  message +=
    messages.KEYLIST.MESSAGES[2][
      utils.getLanguage(sender.getSteamID64(), users)
    ];
  for (
    let j = 0;
    j <
    messages.KEYLIST.ACCEPTED.TF[
      utils.getLanguage(sender.getSteamID64(), users)
    ].length;
    j += 1
  ) {
    message +=
      messages.KEYLIST.ACCEPTED.TF[
        utils.getLanguage(sender.getSteamID64(), users)
      ][j];
  }

  message = `/pre ${removeKeys(message).join('\n')}`;

  chatMessage(client, sender, message);
};
