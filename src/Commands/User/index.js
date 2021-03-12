/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const main = require('../../Config/main');
const { parseCommand } = require('../../Utils');
const BUYCSGO = require('./CSGO/BUY');
const CHECKCSGO = require('./CSGO/CHECK');
const SELLCSGO = require('./CSGO/SELL');
const CHECK = require('./GENERAL/CHECK');
const COMMANDS = require('./GENERAL/COMMANDS');
const HELP = require('./GENERAL/HELP');
const INVITE = require('./GENERAL/INVITE');
const KEYLIST = require('./GENERAL/KEYLIST');
const LANG = require('./GENERAL/LANGUAGE');
const CN = require('./GENERAL/LANGUAGE/CN');
const DE = require('./GENERAL/LANGUAGE/DE');
const EN = require('./GENERAL/LANGUAGE/EN');
const ES = require('./GENERAL/LANGUAGE/ES');
const FR = require('./GENERAL/LANGUAGE/FR');
const JA = require('./GENERAL/LANGUAGE/JA');
const PT = require('./GENERAL/LANGUAGE/PT');
const RU = require('./GENERAL/LANGUAGE/RU');
const OWNER = require('./GENERAL/OWNER');
const PRICES = require('./GENERAL/PRICES');
const REPORT = require('./GENERAL/REPORT');
const SELLCHECK = require('./GENERAL/SELLCHECK');
const STOCK = require('./GENERAL/STOCK');
const TUTORIAL = require('./GENERAL/TUTORIAL');
const BUYHYDRA = require('./HYDRA/BUY');
const CHECKHYDRA = require('./HYDRA/CHECK');
const SELLHYDRA = require('./HYDRA/SELL');
const BUYTF = require('./TF/BUY');
const CHECKTF = require('./TF/CHECK');
const SELLTF = require('./TF/SELL');

module.exports = (sender, msg, client, users, community, manager) => {
  const input = msg.toUpperCase().split(' ')[0];
  const ignoreCommands = main.ignoreCommands.map((el) => el.toUpperCase());
  const { acceptedCurrencies, handleSuppliers, acceptedLanguages } = main;

  if (ignoreCommands.includes(input)) {
    return 'UNKNOW';
  }

  if (
    input.includes(`!KEYLIST`) &&
    !acceptedCurrencies.CSGO &&
    !acceptedCurrencies.TF2 &&
    !acceptedCurrencies.HYDRA
  ) {
    return 'UNKNOW';
  }

  if (input.includes(`!TUTORIAL`) && main.tutorial === '') {
    return 'UNKNOW';
  }

  if (input.includes(`!OWNER`) && main.owner === '') {
    return 'UNKNOW';
  }

  for (const key in acceptedCurrencies) {
    if (typeof acceptedCurrencies[key] !== 'boolean') {
      throw new Error(
        'Error in configuring accepted currencies: not is boolean'
      );
    } else if (
      input.includes(key.replace('2', '')) &&
      !acceptedCurrencies[key]
    ) {
      return 'UNKNOW';
    }
  }

  for (const lang in acceptedLanguages) {
    if (!acceptedLanguages[lang] && input.includes(`!${lang}`)) {
      return 'UNKNOW';
    }
  }

  if (!handleSuppliers && input.includes('!SELL')) {
    return 'UNKNOW';
  }

  switch (input) {
    case parseCommand(input, '!COMMANDS | !COMMAND'):
      COMMANDS(sender, client, users);
      break;
    case '!HELP':
      HELP(sender, client, users);
      break;
    case '!AJUDA':
      HELP(sender, client, users, 'PT');
      break;
    case '!ПОМОЩЬ':
      HELP(sender, client, users, 'RU');
      break;
    case '!AYUDA':
      HELP(sender, client, users, 'ES');
      break;
    case '!救命':
      HELP(sender, client, users, 'CN');
      break;
    case '!AIDER':
      HELP(sender, client, users, 'FR');
      break;
    case '!助けて':
      HELP(sender, client, users, 'JA');
      break;
    case '!HILFE':
      HELP(sender, client, users, 'DE');
      break;
    case parseCommand(
      input,
      '!LANG | !LANGUAGE | !SPRACHE | !IDIOMA | !LANGUE | !言語 | !ЯЗЫК'
    ):
      LANG(sender, client, users);
      break;
    case parseCommand(
      input,
      '!EN | !ENGLISH | !ENGLISCHE | !INGLÊS | !英语 | !英語 | !АНГЛИЙСКИЙ'
    ):
      EN(sender, client, users);
      break;
    case parseCommand(
      input,
      '!ES | !SPANISH | !SPANISCHE | !ESPANHOL | !西班牙语 | !スペイン語 | !ИСПАНСКИЙ'
    ):
      ES(sender, client, users);
      break;
    case parseCommand(
      input,
      '!PT | !PORTUGUESE | !PORTUGIESISCHE | !PORTUGUÊS | !葡萄牙语语言 | !ポルトガル語 | !ПОРТУГАЛЬСКИЙ'
    ):
      PT(sender, client, users);
      break;
    case parseCommand(
      input,
      '!CN | !CHINESE | !CHINESISCHE | !CHINÊS | !CHINO | !中文 | !中国語 | !КИТАЙСКИЙ'
    ):
      CN(sender, client, users);
      break;
    case parseCommand(
      input,
      '!RU | !RUSSIAN | !RUSSISCHE | !RUSSO | !RUSO | !俄语 | !ロシア語 | !РУССКИЙ'
    ):
      RU(sender, client, users);
      break;
    case parseCommand(
      input,
      '!FR | !FRANCE | !FRANKREICH | !FRANCÊS | !FRANCIA | !語言法國 | !言語フランス | !ФРАНЦИЯ'
    ):
      FR(sender, client, users);
      break;
    case parseCommand(
      input,
      '!JA | !JAPANESE | !JAPANISCH | !JAPONÊS | !語言日語 | !日本語日本語 | !ЯПОНСКИЙ'
    ):
      JA(sender, client, users);
      break;
    case parseCommand(
      input,
      '!DE | !GERMAN | !DEUTSCHE | !ALEMÂO | !德国的语言 | !ドイツ語 | !НЕМЕЦКИЙ'
    ):
      DE(sender, client, users);
      break;
    case '!BUYCSGO':
      BUYCSGO(sender, msg, client, users, manager);
      break;
    case '!BUYHYDRA':
      BUYHYDRA(sender, msg, client, users, manager);
      break;
    case '!BUYTF':
      BUYTF(sender, msg, client, users, manager);
      break;
    case '!SELLCSGO':
      SELLCSGO(sender, msg, client, users, community, manager);
      break;
    case '!SELLHYDRA':
      SELLHYDRA(sender, msg, client, users, community, manager);
      break;
    case '!SELLTF':
      SELLTF(sender, msg, client, users, community, manager);
      break;
    case '!CHECK':
      CHECK(sender, msg, client, users);
      break;
    case '!CHECKCSGO':
      CHECKCSGO(sender, msg, client, users);
      break;
    case '!CHECKHYDRA':
      CHECKHYDRA(sender, msg, client, users);
      break;
    case '!CHECKTF':
      CHECKTF(sender, msg, client, users);
      break;
    case '!SELLCHECK':
      SELLCHECK(sender, client, users, community);
      break;
    case '!INVITE':
      INVITE(sender, client, users, community);
      break;
    case '!KEYLIST':
      KEYLIST(sender, client, users);
      break;
    case '!OWNER':
      OWNER(sender, client, users);
      break;
    case parseCommand(input, '!PRICES | !PRICE | !RATES | !RATE'):
      PRICES(sender, client, users);
      break;
    case '!REPORT':
      REPORT(sender, msg, client, users);
      break;
    case parseCommand(input, '!STOCK | !STATS'):
      STOCK(sender, client, users);
      break;
    case '!TUTORIAL':
      TUTORIAL(sender, client, users);
      break;
    default:
      return 'UNKNOW';
  }
};
