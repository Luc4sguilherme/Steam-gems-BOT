/* eslint-disable no-shadow */
/* eslint-disable consistent-return */

const async = require('async');
const moment = require('moment');

const acceptedCurrencies = require('../Config/currencies');
const log = require('./log');

const customer = {};

customer.stock = {
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

customer.loadInventory = (id64, community, callback) => {
  const Inventory = {
    GEMS: (callback) => {
      customer.loadGEMS(id64, community, (ERR) => {
        if (ERR) {
          callback(ERR);
        } else {
          callback(null, true);
        }
      });
    },
    TF2: (callback) => {
      customer.loadTF(id64, community, (ERR) => {
        if (ERR) {
          callback(ERR);
        } else {
          callback(null, true);
        }
      });
    },
    CSGO: (callback) => {
      customer.loadCSGO(id64, community, (ERR) => {
        if (ERR) {
          callback(ERR);
        } else {
          callback(null, true);
        }
      });
    },
    HYDRA: (callback) => {
      setTimeout(() => {
        customer.loadHYDRA(id64, community, (ERR) => {
          if (ERR) {
            callback(ERR);
          } else {
            callback(null, true);
          }
        });
      }, moment.duration(3, 'seconds'));
    },
  };

  async.series(Inventory, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

customer.loadCSGO = (id64, community, callback) => {
  community.getUserInventoryContents(id64, 730, 2, false, (ERR, INV) => {
    if (!ERR) {
      customer.stock.csKeys.tradable = 0;
      customer.stock.csKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.csgo.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            customer.stock.csKeys.tradable += 1;
          } else {
            customer.stock.csKeys.notradable += 1;
          }
        }
      }

      callback();
    } else {
      log.error(`An error occurred while getting user CSGO inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

customer.loadHYDRA = (id64, community, callback) => {
  community.getUserInventoryContents(id64, 730, 2, false, (ERR, INV) => {
    if (!ERR) {
      customer.stock.hydraKeys.tradable = 0;
      customer.stock.hydraKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.hydra.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            customer.stock.hydraKeys.tradable += 1;
          } else {
            customer.stock.hydraKeys.notradable += 1;
          }
        }
      }

      callback();
    } else {
      log.error(`An error occurred while getting user HYDRA inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

customer.loadTF = (id64, community, callback) => {
  community.getUserInventoryContents(id64, 440, 2, false, (ERR, INV) => {
    if (!ERR) {
      customer.stock.tfKeys.tradable = 0;
      customer.stock.tfKeys.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (acceptedCurrencies.tf.indexOf(INV[i].market_hash_name) >= 0) {
          if (INV[i].tradable) {
            customer.stock.tfKeys.tradable += 1;
          } else {
            customer.stock.tfKeys.notradable += 1;
          }
        }
      }

      callback();
    } else {
      log.error(`An error occurred while getting user TF2 inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

customer.loadGEMS = (id64, community, callback) => {
  community.getUserInventoryContents(id64, 753, 6, false, (ERR, INV) => {
    if (!ERR) {
      customer.stock.gemsQuantity.tradable = 0;
      customer.stock.gemsQuantity.notradable = 0;
      for (let i = 0; i < INV.length; i += 1) {
        if (
          acceptedCurrencies.steamGems.indexOf(INV[i].market_hash_name) >= 0
        ) {
          if (INV[i].tradable) {
            customer.stock.gemsQuantity.tradable += INV[i].amount;
          } else {
            customer.stock.gemsQuantity.notradable += INV[i].amount;
          }
        }
      }

      callback();
    } else {
      log.error(`An error occurred while getting user Gems inventory: ${ERR}`);
      callback(ERR);
    }
  });
};

module.exports = customer;
