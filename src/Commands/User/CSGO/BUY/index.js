/* eslint-disable no-restricted-syntax */
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const makeOffer = require('../../../../Components/offer');
const acceptedCurrencies = require('../../../../Config/currencies');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');
const utils = require('../../../../Utils');

module.exports = (sender, msg, client, users, manager) => {
  const amountofkeys = parseInt(msg.toUpperCase().replace('!BUYCSGO ', ''), 10);
  const maxKeys = parseInt(main.maxBuy, 10);
  if (!Number.isNaN(amountofkeys) && amountofkeys > 0) {
    log.userChat(
      sender.getSteamID64(),
      utils.getLanguage(sender.getSteamID64(), users),
      `[ !BUYCSGO ${amountofkeys} ]`
    );
    if (amountofkeys <= maxKeys) {
      chatMessage(
        client,
        sender,
        messages.REQUEST[utils.getLanguage(sender.getSteamID64(), users)]
      );

      manager.getUserInventoryContents(
        sender.getSteamID64(),
        730,
        2,
        true,
        (error1, INV1) => {
          if (!error1) {
            const inv1 = [...INV1];
            const theirKeys = [];

            for (let i = 0; i < inv1.length; i += 1) {
              if (
                theirKeys.length < amountofkeys &&
                acceptedCurrencies.csgo.indexOf(inv1[i].market_hash_name) >= 0
              ) {
                theirKeys.push(inv1[i]);
              }
            }

            if (theirKeys.length !== amountofkeys) {
              chatMessage(
                client,
                sender,
                messages.ERROR.OUTOFSTOCK.DEFAULT.CSGO.THEM[0][
                  utils.getLanguage(sender.getSteamID64(), users)
                ]
              );
            } else {
              manager.getUserInventoryContents(
                client.steamID.getSteamID64(),
                753,
                6,
                true,
                (error2, INV2) => {
                  if (!error2) {
                    const inv2 = [...INV2];
                    const botGems = [];
                    let amountofgems = 0;
                    let need = amountofkeys * rates.csgo.sell;

                    for (let i = 0; i < inv2.length; i += 1) {
                      if (need !== 0) {
                        if (
                          acceptedCurrencies.steamGems.indexOf(
                            inv2[i].market_hash_name
                          ) >= 0
                        ) {
                          inv2[i].amount =
                            need <= inv2[i].amount ? need : inv2[i].amount;
                          need -= inv2[i].amount;
                          amountofgems += inv2[i].amount;
                          botGems.push(inv2[i]);
                        }
                      } else {
                        break;
                      }
                    }

                    if (amountofgems < amountofkeys * rates.csgo.sell) {
                      chatMessage(
                        client,
                        sender,
                        messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.US[0][
                          utils.getLanguage(sender.getSteamID64(), users)
                        ]
                      );
                    } else {
                      const message = messages.TRADE.SETMESSAGE[1].CSGO[
                        utils.getLanguage(sender.getSteamID64(), users)
                      ]
                        .replace('{GEMS}', amountofgems)
                        .replace('{CSGO}', amountofkeys);
                      makeOffer(
                        client,
                        users,
                        manager,
                        sender.getSteamID64(),
                        botGems,
                        theirKeys,
                        '!BUYCSGO',
                        message,
                        amountofkeys,
                        amountofgems
                      );
                    }
                  } else {
                    log.error(
                      `An error occurred while getting bot inventory: ${error2}`
                    );
                    chatMessage(
                      client,
                      sender,
                      messages.ERROR.LOADINVENTORY.US[
                        utils.getLanguage(sender.getSteamID64(), users)
                      ]
                    );
                  }
                }
              );
            }
          } else if (error1.message.indexOf('profile is private') > -1) {
            chatMessage(
              client,
              sender,
              messages.ERROR.LOADINVENTORY.THEM[2][
                utils.getLanguage(sender.getSteamID64(), users)
              ]
            );
            log.error(
              `An error occurred while getting user inventory: ${error1}`
            );
          } else {
            chatMessage(
              client,
              sender,
              messages.ERROR.LOADINVENTORY.THEM[0][
                utils.getLanguage(sender.getSteamID64(), users)
              ]
            );
            log.error(
              `An error occurred while getting user inventory: ${error1}`
            );
          }
        }
      );
    } else {
      chatMessage(
        client,
        sender,
        messages.ERROR.INPUT.AMOUNTOVER.CSGO[
          utils.getLanguage(sender.getSteamID64(), users)
        ].replace('{KEYS}', maxKeys)
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.CSGO[
        utils.getLanguage(sender.getSteamID64(), users)
      ].replace('{command}', '!BUYCSGO 1')
    );
  }
};
