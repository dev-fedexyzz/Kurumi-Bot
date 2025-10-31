import fs from 'fs';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let nombre = await conn.getName(m.sender);

  function getSaludo() {
    const hora = new Date().getHours();
    if (hora>= 5 && hora < 12) return '𝖻𝗎𝖾𝗇 𝖽𝗂́𝖺';
    if (hora>= 12 && hora < 18) return '𝖻𝗎𝖾𝗇𝖺𝗌 𝗍𝖺𝗋𝖽𝖾𝗌';
    return '𝖡𝗎𝖾𝗇𝖺𝗌 𝗇𝗈𝖼𝗁𝖾𝗌';
}

  let saludo = getSaludo();

  let tags = {
    'main': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴍᴀɪɴ`_* ☕',
    'fun': '𓂂𓏸 *_`ᴍᴇɴᴜ ғᴜɴ`_* 🎭',
    'anime': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴀɴɪᴍᴇ`_* 🌸',
    'descargas': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ`_* 🎧',
    'grupo': '𓂂𓏸 *_`ᴍᴇɴᴜ ɢʀᴜᴘᴏs`_* 🍒',
    'ia': '𓂂𓏸 *_`ᴍᴇɴᴜ ɪᴀ`_* ☁️',
    'tools': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴛᴏᴏʟs`_* 🧩',
    'owner': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴏᴡɴᴇʀ`_* ⚙️',
    'serbot': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴊᴀᴅɪ-ʙᴏᴛ`_* ☕',
    'buscador': '𓂂𓏸 *_`ᴍᴇɴᴜ ʙᴜsᴄᴀᴅᴏʀ`_* 🍑',
};

  let header = '%category';
  let body = '> ര ׄ ☕ ׅ *_%cmd_*';
  let footer = '';
  let after = ``;

  let user = global.db.data.users[m.sender];
  let premium = user.premium? '𝗌𝗂': '𝗇𝗈';
  let limit = user.limit || 0;
  let totalreg = Object.keys(global.db.data.users).length;
  let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length;
  let uptime = clockString(process.uptime());

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

  let infoUser = `
🍒 *_Bienvenid @${nombre}_*
──────────────────────
📚 *_Usuario_*:: @${m.sender.split('@')[0]}
☕ *_Baileys_*:: *_fedExz-Bails_*
🍉 *_Premium_*:: ${premium}
⏳ *_Tiempo activo_*:: ${uptime}
☁️ *_Grupos activos_*:: ${groupsCount}
🌿 *_Comandos disponibles_*:: ${Object.keys(global.plugins).length}
📡 *_Fecha actual_*:: \`${new Date().toLocaleString('es-ES')}\`
`.trim();

  let commands = Object.values(global.plugins).filter(v => v.help && v.tags && v.command).map(v => ({
    help: Array.isArray(v.help)? v.help: [v.help],
    tags: Array.isArray(v.tags)? v.tags: [v.tags],
    command: Array.isArray(v.command)? v.command: [v.command]
}));

  let menu = [];
  for (let tag in tags) {
    let comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.command.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n');
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer);
}
}

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after;
  let imagen = 'https://files.catbox.moe/c65bk7.jpg';

  await m.react('🍮');

  const interactiveMessage = {
    header: {
      title: '',
      hasMediaAttachment: true,
      documentMessage: {
        url: imagen,
        mimetype: 'application/pdf',
        fileName: '🄺🅄🅁🅄🄼🄸 ꒰ 🌾 ꒱'
}
},
    body: { text: finalMenu},
    footer: { text: ' '},
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: ' ',
            sections: [
              {
                title: 'SELECCIONE UNA CATEGORIA 💥',
                rows: [
                  { header: '📚MENU COMPLETO', title: 'Comandos', id: '.allmenu'},
                  { header: '🔕 Eliminar registro ', title: 'Eliminar registro', id: '.unreg'},
                  { header: '📚 Información sobre el server', title: 'Sobre el server', id: '.estado'},
                ]
}
            ]
})
}
      ],
      messageParamsJson: ''
},
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: 'Selecciona aqui',
        thumbnail: await (await fetch(imagen)).buffer(),
        mediaType: 1,
        showAdAttribution: false
}
}
};

  await conn.sendMessage(m.chat, interactiveMessage, { quoted: m});

  await delay(400);
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;

export default handler;
