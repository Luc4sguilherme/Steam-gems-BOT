const Joi = require('joi');

const main = require('../../Config/main');
const rates = require('../../Config/rates');
const colors = require('./constants/colors');
const commands = require('./constants/commands');

function validate() {
  const schemaMain = Joi.object().keys({
    userName: Joi.string().required(),
    passWord: Joi.string().required(),
    steamID: Joi.string().required(),
    sharedSecret: Joi.string().required(),
    identitySecret: Joi.string().required(),
    admins: Joi.array().min(1).items(Joi.string().required()),
    owner: Joi.string().uri().allow(''),
    tutorial: Joi.string().uri().allow(''),
    timeZone: Joi.string().allow(''),
    acceptDonations: Joi.boolean().required(),
    ignoreCommands: Joi.array().items(
      Joi.string()
        .valid(...commands)
        .uppercase()
        .allow('')
    ),
    acceptedCurrencies: Joi.object().keys({
      CSGO: Joi.boolean().required(),
      HYDRA: Joi.boolean().required(),
      TF2: Joi.boolean().required(),
    }),
    handleSuppliers: Joi.boolean().required(),
    acceptedLanguages: Joi.object().keys({
      EN: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      PT: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      ES: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      FR: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      DE: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      RU: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      JA: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
      CN: Joi.alternatives()
        .try(Joi.string().valid('DEFAULT').uppercase(), Joi.boolean())
        .required(),
    }),
    steamGroup: Joi.object().keys({
      doInvites: Joi.boolean().required(),
      link: Joi.string().uri().required(),
      ID: Joi.string().required(),
      refuseInvites: Joi.boolean().required(),
    }),
    ratesInBotName: Joi.object().keys({
      status: Joi.boolean().required(),
      currency: Joi.string().valid('CSGO', 'TF', 'HYDRA').default('CSGO'),
    }),
    botName: Joi.string().allow(''),
    getTradeMessages: Joi.boolean().required(),
    comment: Joi.object().keys({
      enabled: Joi.boolean().required(),
      interval: Joi.number().required().integer().positive().min(1).default(24),
    }),
    maxDaysAdded: Joi.number()
      .required()
      .integer()
      .positive()
      .min(1)
      .default(180),
    maxMsgPerSec: Joi.number()
      .required()
      .integer()
      .positive()
      .min(1)
      .default(2),
    maxBuy: Joi.number().required().integer().positive().min(1).default(1500),
    maxSell: Joi.number().required().integer().positive().min(1).default(1000),
    maxCheck: Joi.object().keys({
      csgo: Joi.number().required().integer().positive().min(1).default(10000),
      tf: Joi.number().required().integer().positive().min(1).default(10000),
      hydra: Joi.number().required().integer().positive().min(1).default(10000),
    }),
    log: Joi.object().keys({
      warn: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('yellowBright'),
      }),
      error: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('redBright'),
      }),
      info: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('greenBright'),
      }),
      userChat: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('whiteBright'),
      }),
      adminChat: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('blackBright'),
      }),
      tradeOffer: Joi.object().keys({
        enabled: Joi.boolean().required(),
        color: Joi.string()
          .required()
          .valid(...colors)
          .default('blueBright'),
      }),
    }),
  });

  const schemaRates = Joi.object({
    csgo: {
      buy: Joi.number().required().integer().positive().min(1),
      sell: Joi.number().required().integer().positive().min(1),
    },

    hydra: {
      buy: Joi.number().required().integer().positive().min(1),
      sell: Joi.number().required().integer().positive().min(1),
    },

    tf: {
      buy: Joi.number().required().integer().positive().min(1),
      sell: Joi.number().required().integer().positive().min(1),
    },
  });

  const { error: errorMain } = schemaMain.validate(main, {
    convert: false,
    abortEarly: false,
  });

  const { error: errorRates } = schemaRates.validate(rates, {
    convert: false,
    abortEarly: false,
  });

  if (errorMain) {
    const errors = errorMain.details.map((detail) => detail.message).join(', ');

    throw new Error(
      `There are errors in the main configuration file: ${errors}`
    );
  }

  if (errorRates) {
    const errors = errorRates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the rates configuration file: ${errors}.`
    );
  }
}

module.exports = {
  validate,
};
