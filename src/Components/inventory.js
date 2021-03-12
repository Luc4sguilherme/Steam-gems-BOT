/* eslint-disable no-shadow */
/* eslint-disable consistent-return */

const async = require('async');
const moment = require('moment');

const acceptedCurrencies = require('../Config/currencies');
const rates = require('../Config/rates.js');
const utils = require('../Utils');
const { removeCurrency } = require('../Utils');
const log = require('./log');

const inventory = {};

inventory.loading = 0;
inventory.stock = {
  csKeys: {
    tradable: 0,
    notradable: 0,
  },
  tfKeys: {
    tradable: 0,
    notradable: 0,
  },
  hydraKeys: {
    tradable: 0,
    notradable: 0,
  },
  gemsQuantity: {
    tradable: 0,
    notradable: 0,
  },
};

inventory.play = (client) => {
  const playThis = ['', true];
  const ratesText = removeCurrency(
    `${rates.csgo.sell}:1 CS:GO, ${rates.hydra.sell}:1 HYDRA, ${rates.tf.sell}:1 TF2`.split(
      ','
    ),
    false
  ).join(',');

  playThis[0] = `${inventory.stock.gemsQuantity.tradable} Gems ► ${ratesText}`;
  client.gamesPlayed(playThis);
};

inventory.loadInventory = (client, community, load, callback) => {
  const SID = client.steamID.getSteamID64();
  const startedTime = Date.now();
  inventory.loading += 1;
  utils.playLoading.resetTimer();
  utils.playLoading.startTimer(client);
  const Inventory = {
    GEMS: (callback) => {
      inventory.loadGEMS(SID, community, (ERR) => {
        if (ERR) {
          return setTimeout(() => {
            Inventory.GEMS(callback);
          }, moment.duration(5, 'seconds'));
        }
        callback(null, true);
      });
    },
    TF2: (callback) => {
      inventory.loadTF(SID, community, (ERR) => {
        if (ERR) {
          return setTimeout(() => {
            Inventory.TF2(callback);
          }, moment.duration(5, 'seconds'));
        }
        callback(null, true);
      });
    },
    CSGO: (callback) => {
      inventory.loadCSGO(SID, community, (ERR) => {
        if (ERR) {
          return setTimeout(() => {
            Inventory.CSGO(callback);
          }, moment.duration(5, 'seconds'));
        }
        callback(null, true);
      });
    },
    HYDRA: (callback) => {
      setTimeout(() => {
        inventory.loadHYDRA(SID, community, (ERR) => {
          if (ERR) {
            return setTimeout(() => {
              Inventory.HYDRA(callback);
            }, moment.duration(5, 'seconds'));
          }
          callback(null, true);
        });
      }, moment.duration(3, 'seconds'));
    },
  };

  const LoadInventories = [];
  for (let i = 0; i < load.length; i += 1) {
    LoadInventories.push(Inventory[load[i]]);
  }

  async.series(LoadInventories, () => {
    utils.playLoading.resetTimer();
    inventory.loading -= 1;
    log.warn(
      `Inventory loaded in ${moment().diff(
        startedTime,
        'seconds',
        true
      )} seconds!`
    );
    if (callback) callback(true);
  });
};

inventory.updateStock = (offer, client, community) => {
  const load = [];

  function add(param) {
    load.push(param);
  }

  if (offer.data('amountofgems') > 0) {
    add('GEMS');
  }
  if (offer.data('commandused').search(/CSGO/) !== -1) {
    add('CSGO');
  }
  if (offer.data('commandused').search(/TF/) !== -1) {
    add('TF2');
  }
  if (offer.data('commandused').search(/HYDRA/) !== -1) {
    add('HYDRA');
  }
  if (load.length !== 0) {
    inventory.loadInventory(client, community, load, () => {
      inventory.play(client);
    });
  }
};

inventory.loadCSGO = (SID, community, callback) => {
  community.getUserInventoryContents(SID, 730, 2, false, (ERR, INV) => {
    if (!ERR) {
      inventory.stock.csKeys.tradable = 0;
      inventory.stock.csKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.csgo.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            inventory.stock.csKeys.tradable += 1;
          } else {
            inventory.stock.csKeys.notradable += 1;
          }
        }
      }
      log.info(
        `Bot's CSGO loaded: ${inventory.stock.csKeys.tradable} tradable, ${inventory.stock.csKeys.notradable} notradable.`
      );
      callback();
    } else {
      log.error(`An error occurred while getting bot CSGO inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

inventory.loadHYDRA = (SID, community, callback) => {
  community.getUserInventoryContents(SID, 730, 2, false, (ERR, INV) => {
    if (!ERR) {
      inventory.stock.hydraKeys.tradable = 0;
      inventory.stock.hydraKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.hydra.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            inventory.stock.hydraKeys.tradable += 1;
          } else {
            inventory.stock.hydraKeys.notradable += 1;
          }
        }
      }
      log.info(
        `Bot's Hydra loaded: ${inventory.stock.hydraKeys.tradable} tradable, ${inventory.stock.hydraKeys.notradable} notradable.`
      );
      callback();
    } else {
      log.error(`An error occurred while getting bot HYDRA inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

inventory.loadTF = (SID, community, callback) => {
  community.getUserInventoryContents(SID, 440, 2, false, (ERR, INV) => {
    if (!ERR) {
      inventory.stock.tfKeys.tradable = 0;
      inventory.stock.tfKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.tf.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            inventory.stock.tfKeys.tradable += 1;
          } else {
            inventory.stock.tfKeys.notradable += 1;
          }
        }
      }
      log.info(
        `Bot's TF2 loaded: ${inventory.stock.tfKeys.tradable} tradable, ${inventory.stock.tfKeys.notradable} notradable.`
      );
      callback();
    } else {
      log.error(`An error occurred while getting bot TF2 inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

inventory.loadGEMS = (SID, community, callback) => {
  community.getUserInventoryContents(SID, 753, 6, false, (ERR, INV) => {
    if (!ERR) {
      inventory.stock.gemsQuantity.tradable = 0;
      inventory.stock.gemsQuantity.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (
          acceptedCurrencies.steamGems.indexOf(INV[i].market_hash_name) >= 0
        ) {
          if (INV[i].tradable) {
            inventory.stock.gemsQuantity.tradable += INV[i].amount;
          } else {
            inventory.stock.gemsQuantity.notradable += INV[i].amount;
          }
        }
      }
      log.info(
        `Bot's Gems loaded: ${inventory.stock.gemsQuantity.tradable} tradable, ${inventory.stock.gemsQuantity.notradable} notradable.`
      );
      callback();
    } else {
      log.error(`An error occurred while getting bot Gems inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

module.exports = inventory;
