const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, client, users) => {
  const language = utils.getLanguage(sender.getSteamID64(), users);

  log.userChat(sender.getSteamID64(), language, '[ !PRICES ]');
  chatMessage(
    client,
    sender,
    filterCommands(messages.PRICES[language])
      .join('\n')
      .replace('{CSGOSELL}', rates.csgo.sell)
      .replace('{TFSELL}', rates.tf.sell)
      .replace('{HYDRASELL}', rates.hydra.sell)
      .replace('{CSGOBUY}', rates.csgo.buy)
      .replace('{TFBUY}', rates.tf.buy)
      .replace('{HYDRABUY}', rates.hydra.buy)
  );
};
