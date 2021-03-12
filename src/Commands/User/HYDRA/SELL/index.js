/* eslint-disable no-restricted-syntax */
const log = require('../../../../Components/log');
const chatMessage = require('../../../../Components/message');
const makeOffer = require('../../../../Components/offer');
const acceptedCurrencies = require('../../../../Config/currencies');
const main = require('../../../../Config/main');
const messages = require('../../../../Config/messages');
const rates = require('../../../../Config/rates');

module.exports = (sender, msg, client, users, community, manager) => {
  const amountofkeys = parseInt(
    msg.toUpperCase().replace('!SELLHYDRA ', ''),
    10
  );
  const maxKeys = parseInt(main.maxSell, 10);
  if (!Number.isNaN(amountofkeys) && amountofkeys > 0) {
    log.userChat(
      sender.getSteamID64(),
      users[sender.getSteamID64()].language,
      `[ !SELLHYDRA ${amountofkeys} ]`
    );
    if (amountofkeys <= maxKeys) {
      chatMessage(
        client,
        sender,
        messages.REQUEST[users[sender.getSteamID64()].language]
      );

      manager.getUserInventoryContents(
        sender.getSteamID64(),
        753,
        6,
        true,
        (error1, INV1) => {
          if (!error1) {
            const inv1 = [...INV1];
            const theirGems = [];
            let amountofgems = 0;
            let need = amountofkeys * rates.hydra.buy;
            for (let i = 0; i < inv1.length; i += 1) {
              if (need !== 0) {
                if (
                  acceptedCurrencies.steamGems.indexOf(
                    inv1[i].market_hash_name
                  ) >= 0
                ) {
                  inv1[i].amount =
                    need <= inv1[i].amount ? need : inv1[i].amount;
                  need -= inv1[i].amount;
                  amountofgems += inv1[i].amount;
                  theirGems.push(inv1[i]);
                }
              } else {
                break;
              }
            }

            if (amountofgems < amountofkeys * rates.hydra.buy) {
              chatMessage(
                client,
                sender,
                messages.ERROR.OUTOFSTOCK.DEFAULT.GEMS.THEM[0][
                  users[sender.getSteamID64()].language
                ]
              );
            } else {
              manager.getUserInventoryContents(
                client.steamID.getSteamID64(),
                730,
                2,
                true,
                (error2, inv2) => {
                  if (error2) {
                    log.error(
                      `An error occurred while getting bot inventory: ${error2}`
                    );
                    chatMessage(
                      client,
                      sender,
                      messages.ERROR.LOADINVENTORY.US[
                        users[sender.getSteamID64()].language
                      ]
                    );
                  } else {
                    const botKeys = [];

                    for (let i = 0; i < inv2.length; i += 1) {
                      if (
                        botKeys.length < amountofkeys &&
                        acceptedCurrencies.hydra.indexOf(
                          inv2[i].market_hash_name
                        ) >= 0
                      ) {
                        botKeys.push(inv2[i]);
                      }
                    }
                    if (botKeys.length !== amountofkeys) {
                      chatMessage(
                        client,
                        sender,
                        messages.ERROR.OUTOFSTOCK.DEFAULT.HYDRA.US[0][
                          users[sender.getSteamID64()].language
                        ]
                      );
                    } else {
                      const message = messages.TRADE.SETMESSAGE[2].HYDRA[
                        users[sender.getSteamID64()].language
                      ]
                        .replace('{GEMS}', amountofgems)
                        .replace('{HYDRA}', amountofkeys);
                      makeOffer(
                        client,
                        users,
                        manager,
                        sender.getSteamID64(),
                        botKeys,
                        theirGems,
                        '!SELLHYDRA',
                        message,
                        amountofkeys,
                        amountofgems
                      );
                    }
                  }
                }
              );
            }
          } else if (error1.message.indexOf('profile is private') > -1) {
            chatMessage(
              client,
              sender,
              messages.ERROR.LOADINVENTORY.THEM[2][
                users[sender.getSteamID64()].language
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
                users[sender.getSteamID64()].language
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
        messages.ERROR.INPUT.AMOUNTOVER.HYDRA[
          users[sender.getSteamID64()].language
        ].replace('{KEYS}', maxKeys)
      );
    }
  } else {
    chatMessage(
      client,
      sender,
      messages.ERROR.INPUT.INVALID.HYDRA[
        users[sender.getSteamID64()].language
      ].replace('{command}', '!SELLHYDRA 1')
    );
  }
};
