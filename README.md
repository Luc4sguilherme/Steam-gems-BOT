# Steam-gems-BOT
This is an advanced gems bot script.

## Requirements:
- Steam account without limitations. Check <a href='https://support.steampowered.com/kb_article.php?ref=3330-iagk-7663'>steam support</a> to see your account status 
- Steam Desktop authentication
- Node.js v14 or higher 
- Steam Group

## Bot Currencies:
- CS:GO Keys
- Hydra Keys
- TF2 Keys

## Features:
### Change Language
- The bot has commands for the user to change the language
### Inventory Smart 
- Bot recognizes what inventory need to be reload in every trade, avoiding extra requests (i.e a !buytf would only reload steam and tf inventory, csgo would be ignored)
### Trade Tracking 
- Never lost track of your bot trades, bot will be warning about every single trade
### Profits Tracking 
- Bot will be registering every single !sell/!buy to you keep track of your profits
### Trade Size Limit
- Limit the amount of keys bot will trade, large amounts means slow processing due to steam servers
### Admins 
- Unlimited admins capacity, you can setup how many admins you want, no matter the size of it
### BotName 
- Change botname, you can setup the script to change the botname in every startup, if needed, to display csgo rates (e.g '#BOT 9000:1 CS:GO')
### Inactivity 
- Setup the bot to delete every user who has x days of inactivity
### AntiSpam 
- Never worry about spam anymore, bot will delete any spammer who abuses us (delete, not block)
### Admin Trades 
- Accept any trade sent by admin, although is strong recommended to use bot commands instead, to keep track of your trades
### Profiles comments
- You can setup an specific comment to be made after a customer completes a trade, and this comments will be limited for each customer to avoid flood on that specific profile
### Detailed Logs
- Keep track of every action of your bot, every single log is registered by day, month and hour
### Refuse Groups 
- Setup the bot to refuse any group invite that outcome to your bot
### Group invites 
- Bot will be inviting every customer who completes a trade, grow up your community!
### Perfectly Handle Gems 
- Perfectly parse any gems on inventories, even divided ones
### Handle donations 
- You can enable/disable donates on your bot
### Suppliers 
- You can enable/disable the bot to handle suppliers (!sell commands)
### Currency Management 
- You are able to enable/disable any type of currency, that way you can make a very specific bot (i.e a bot who only accept hydra keys)
### Commands Management 
- You can enable/disable commands specific
### Languages Management 
- You can enable/disable languages specific
### BBCodes 
- Some commands like !help and !admin was builded to show in a stylized bbcode
### Trade Messages 
- Every trade will have a message containing the currencies and gems that will be exchange

## Commands: !commands
- <code>!EN</code> - Change the bot's language to english. 
- <code>!PT</code> - Change the bot's language to portuguese. 
- <code>!RU</code> - Change the bot's language to russian. 
- <code>!ES</code> - Change the bot's language to spanish. 
- <code>!CN</code> - Change the bot's language to chinese.
- <code>!FR</code> - Change the bot's language to french. 
- <code>!JA</code> - Change the bot's language to japanese. 
- <code>!DE</code> - Change the bot's language to german. 
- <code>!LANG</code> - Change the bot's language. 
- <code>!TUTORIAL</code> - Shows the video tutorial. 
- <code>!PRICES</code> - Shows our current rates. 
- <code>!STOCK</code> - Shows currencies stock of the bot. 
- <code>!REPORT (desired_message)</code> - Use to send messages directly to my owner. 
- <code>!KEYLIST</code> - Shows all tradable Keys. 
- <code>!OWNER</code> - Shows owner account. 
- <code>!INVITE</code> - Sends you an invite to our Steamgroup. 
- <code>!CHECK</code> - Checks how many gems you can buy. 
### CSGO Section. 
- <code>!CHECKCSGO (amount_of_keys)</code> - Shows how many gems you can get for a specific amount of CS:GO keys. 
- <code>!BUYCSGO (amount_of_keys)</code> - Buy gems for a specific amount of CS:GO Keys. 
### Hydra Section. 
- <code>!CHECKHYDRA (amount_of_keys)</code> - Shows how many gems you can get for a specific amount of HYDRA keys. 
- <code>!BUYHYDRA (amount_of_keys)</code> - Buy gems for a specific amount of HYDRA Keys. 
### TF2 Section. 
- <code>!CHECKTF (amount_of_keys)</code> - Shows how many gems you can get for a specific amount of TF2 keys. 
- <code>!BUYTF (amount_of_keys)</code> - Buy gems for a specific amount of TF2 Keys.  
### Suppliers Section. 
- <code>!SELLCHECK</code> - Checks for gems the Bot can buy from you.
- <code>!SELLCSGO (amount_of_keys)</code> - Sell gems for a specific amount of CS:GO Keys. 
- <code>!SELLTF (amount_of_keys)</code> - Sell gems for a specific amount of TF2 Keys.
- <code>!SELLHYDRA (amount_of_keys)</code> - Sell gems for a specific amount of HYDRA Keys.

## Admin Commands: !admin
- <code>!WITHDRAWCSGO (amount_of_keys)</code> - Withdraw a specific amount of CS:GO keys. 
- <code>!WITHDRAWHYDRA (amount_of_keys)</code> - Withdraw a specific amount of HYDRA keys. 
- <code>!WITHDRAWTF (amount_of_keys)</code> - Withdraw a specific amount of TF2 keys. 
- <code>!WITHDRAWGEMS (amount_of_gems)</code> - Withdraw a specific amount of GEMS. 
- <code>!DEPOSITCSGO (amount_of_keys)</code> - Deposits a specific amount of CS:GO keys. 
- <code>!DEPOSITHYDRA (amount_of_keys)</code> - Deposits a specific amount of HYDRA keys. 
- <code>!DEPOSITTF (amount_of_keys)</code> - Deposits a specific amount of TF2 keys amount. 
- <code>!DEPOSITGEMS (amount_of_gems)</code> - Deposits a specific amount of GEMS. 
- <code>!USERCHECK (ID64)</code> - Verify User. 
- <code>!MYSTATS</code> - Verify your inventory. 
- <code>!BLOCK (ID64)</code> - Block user. 
- <code>!UNBLOCK (ID64)</code> - Unlock user. 
- <code>!CANCEL (OFFERID)</code> - Cancel a trade offer. 
- <code>!ROLLBACK (OFFERID)</code> - Rollback a trade. 
- <code>!RELOAD</code> - Reload Inventory. 
- <code>!PROFIT (DAILY / MONTHLY / YEARLY)</code> - Shows information about transactions made by the bot. 
- <code>!AUTHCODE</code> - Shows auth code. 
- <code>!BROADCAST (message)</code> - Send a message to all friends in the friends list. 
- <code>!DIE</code> - Turn off the bot. 
- <code>!RESTART</code> - Restart the bot.
