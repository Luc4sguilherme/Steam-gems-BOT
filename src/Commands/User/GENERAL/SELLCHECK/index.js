const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const acceptedCurrencies = require('../../../../Config/currencies');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');
const { filterCommands } = require('../../../../Utils');

module.exports = (sender, client, users, community) => {
  chatMessage(
    client,
    sender,
    messages.REQUEST[utils.getLanguage(sender.getSteamID64(), users)]
  );
  log.userChat(
    sender.getSteamID64(),
    utils.getLanguage(sender.getSteamID64(), users),
    '[ !SELLCHECK ]'
  );
  community.getUserInventoryContents(
    sender.getSteamID64(),
    753,
    6,
    true,
    (ERR, INV) => {
      if (!ERR) {
        let theirGems = 0;
        for (let i = 0; i < INV.length; i += 1) {
          if (
            acceptedCurrencies.steamGems.indexOf(INV[i].market_hash_name) >= 0
          ) {
            if (INV[i].tradable) {
              theirGems += INV[i].amount;
            }
          }
        }

        if (theirGems) {
          const cs = parseInt(theirGems / rates.csgo.buy, 10);
          const hydra = parseInt(theirGems / rates.hydra.buy, 10);
          const tf = parseInt(theirGems / rates.tf.buy, 10);

          let message = ' ';
          if (cs > 0) {
            message += messages.SELLCHECK.CURRENCIES.CSGO[
              utils.getLanguage(sender.getSteamID64(), users)
            ]
              .replace(/{CSGO}/g, cs)
              .replace('{GEMS1}', cs * rates.csgo.buy);
          }
          if (hydra > 0) {
            message += messages.SELLCHECK.CURRENCIES.HYDRA[
              utils.getLanguage(sender.getSteamID64(), users)
            ]
              .replace(/{HYDRA}/g, hydra)
              .replace('{GEMS2}', hydra * rates.hydra.buy);
          }
          if (tf > 0) {
            message += messages.SELLCHECK.CURRENCIES.TF[
              utils.getLanguage(sender.getSteamID64(), users)
            ]
              .replace(/{TF}/g, tf)
              .replace('{GEMS3}', tf * rates.tf.buy);
          }

          message = filterCommands(message).join('\n');

          if (!message.includes('•')) {
            chatMessage(
              client,
              sender,
              messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.THEM[0][
                utils.getLanguage(sender.getSteamID64(), users)
              ]
            );
            return;
          }

          chatMessage(
            client,
            sender,
            messages.SELLCHECK.RESPONSE[
              utils.getLanguage(sender.getSteamID64(), users)
            ]
              .replace('{GEMS}', theirGems)
              .replace('{MESSAGE}', message)
          );
        } else {
          chatMessage(
            client,
            sender,
            messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.THEM[0][
              utils.getLanguage(sender.getSteamID64(), users)
            ]
          );
        }
      } else if (ERR.message.indexOf('profile is private') > -1) {
        chatMessage(
          client,
          sender,
          messages.ERROR.LOADINVENTORY.THEM[2][
            utils.getLanguage(sender.getSteamID64(), users)
          ]
        );
        log.error(`An error occurred while getting user inventory: ${ERR}`);
      } else {
        chatMessage(
          client,
          sender,
          messages.ERROR.LOADINVENTORY.THEM[0][
            utils.getLanguage(sender.getSteamID64(), users)
          ]
        );
        log.error(`An error occurred while getting user inventory: ${ERR}`);
      }
    }
  );
};
