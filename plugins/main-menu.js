import fs from 'fs';

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
  let imagen = 'https://files.catbox.moe/c65bk7.jpg'; // imagen.jpg

  let tags = {
    'main': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴍᴀɪɴ`_* ☕ ᦡᦡ',
    'fun': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ғᴜɴ`_* 🎭 ᦡᦡ',
    'anime': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴀɴɪᴍᴇ`_* 🌸',
    'descargas': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ`_* 🎧 ᦡᦡ',
    'grupo': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ɢʀᴜᴘᴏs`_* 🍒 ᦡᦡ',
    'ia': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ɪᴀ`_* ☁️ ᦡᦡ',
    'tools': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴛᴏᴏʟs`_* 🧩 ᦡᦡ',
    'owner': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴏᴡɴᴇʀ`_* ⚙️ ᦡᦡ',
    'serbot': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ᴊᴀᴅɪ-ʙᴏᴛ`_* ☕ ᦡᦡ',
    'buscador': '𓂂𓏸 𐅹੭੭  *_`ᴍᴇɴᴜ ʙᴜsᴄᴀᴅᴏʀ`_* 🍑 ᦡᦡ',
};

  let header = '%category';
  let body = '> ര ׄ ☕ ׅ *_%cmd_*';
  let footer = '';
  let after = ``;

  let user = global.db.data.users[m.sender];
  let premium = user.premium? '𝗌𝗂': '𝗇𝗈';
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
🍒 *_Bienvenid@ ${nombre}_*
──────────────────────
📚 *_Usuario_*:: @${m.sender.split('@')[0]}
🍉 *_Premium_*:: ${premium}
⏳ *_Tiempo activo_*:: ${uptime}
🎋 *_Usuarios registrados_*:: ${totalreg}
☁️ *_Grupos activos_*:: ${groupsCount}
🌿 *_Comandos disponibles_*:: ${Object.keys(global.plugins).length}
📡 *_Fecha actual_*:: \`${new Date().toLocaleString('es-ES')}\`
──────────────────────
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

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after + `\n🖼️ Imagen del menú: ${imagen}`;

  await m.react('🍮');

  await conn.sendMessage(m.chat, {
    image: { url: imagen},
    caption: finalMenu,
    document: fs.readFileSync('./README.md'),
    fileName: '🄺🅄🅁🅄🄼🄸 ꒰ 🍮 ꒱',
    mimetype: 'application/pdf',
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: 'Kurumi bot',
        body: `𝖧𝗈𝗅𝖺 ${nombre}, ${saludo}`,
        thumbnailUrl: imagen,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: false
}
}
}, { quoted: m});

  await delay(400);
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];

export default handler;
