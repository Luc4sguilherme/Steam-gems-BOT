const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const Profit = require('../../../../Components/profit');
const messages = require('../../../../Config/messages');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = async (sender, client, users) => {
  try {
    const profit = await Profit.read();

    log.adminChat(
      sender.getSteamID64(),
      users[sender.getSteamID64()].language,
      '[ !PROFIT ]'
    );
    let message = '/pre ';
    message += messages.PROFIT.RESPONSE[0][
      users[sender.getSteamID64()].language
    ].replace(
      '{MONTH}',
      utils.getMonth(
        new Date().getMonth(),
        users[sender.getSteamID64()].language
      )
    );
    message += messages.PROFIT.RESPONSE[1][
      users[sender.getSteamID64()].language
    ].replace('{AMOUNT}', profit.totaltrades);
    if (profit.status.csgo !== 0) {
      message += messages.PROFIT.CSGO[users[sender.getSteamID64()].language]
        .replace(
          '{STATUS}',
          profit.status.csgo > 0
            ? messages.PROFIT.PROFITED[users[sender.getSteamID64()].language]
            : messages.PROFIT.LOST[users[sender.getSteamID64()].language]
        )
        .replace(
          '{AMOUNT}',
          (profit.status.csgo > 0 ? '+' : '-') + Math.abs(profit.status.csgo)
        );
    }
    if (profit.status.hydra !== 0) {
      message += messages.PROFIT.HYDRA[users[sender.getSteamID64()].language]
        .replace(
          '{STATUS}',
          profit.status.hydra > 0
            ? messages.PROFIT.PROFITED[users[sender.getSteamID64()].language]
            : messages.PROFIT.LOST[users[sender.getSteamID64()].language]
        )
        .replace(
          '{AMOUNT}',
          (profit.status.hydra > 0 ? '+' : '-') + Math.abs(profit.status.hydra)
        );
    }
    if (profit.status.tf !== 0) {
      message += messages.PROFIT.TF[users[sender.getSteamID64()].language]
        .replace(
          '{STATUS}',
          profit.status.tf > 0
            ? messages.PROFIT.PROFITED[users[sender.getSteamID64()].language]
            : messages.PROFIT.LOST[users[sender.getSteamID64()].language]
        )
        .replace(
          '{AMOUNT}',
          (profit.status.tf > 0 ? '+' : '-') + Math.abs(profit.status.tf)
        );
    }
    if (profit.status.gems !== 0) {
      message += messages.PROFIT.GEMS[users[sender.getSteamID64()].language]
        .replace(
          '{STATUS}',
          profit.status.gems > 0
            ? messages.PROFIT.PROFITED[users[sender.getSteamID64()].language]
            : messages.PROFIT.LOST[users[sender.getSteamID64()].language]
        )
        .replace(
          '{AMOUNT}',
          (profit.status.gems > 0 ? '+' : '-') + Math.abs(profit.status.gems)
        );
    }
    message += messages.PROFIT.RESPONSE[2][
      users[sender.getSteamID64()].language
    ]
      .replace('{GEMS1}', profit.sell.csgo.gems)
      .replace('{GEMS2}', profit.sell.hydra.gems)
      .replace('{GEMS3}', profit.sell.tf.gems)
      .replace('{GEMS4}', profit.buy.csgo.gems)
      .replace('{GEMS5}', profit.buy.hydra.gems)
      .replace('{GEMS6}', profit.buy.tf.gems)
      .replace('{CSGOSELL}', profit.sell.csgo.currency)
      .replace('{HYDRASELL}', profit.sell.hydra.currency)
      .replace('{TFSELL}', profit.sell.tf.currency)
      .replace('{CSGOBUY}', profit.buy.csgo.currency)
      .replace('{HYDRABUY}', profit.buy.hydra.currency)
      .replace('{TFBUY}', profit.buy.tf.currency);

    message = filterCommands(message).join('\n');

    chatMessage(client, sender, message);
  } catch (error) {
    log.error(`An error occurred while getting profit.json: ${error}`);
  }
};
