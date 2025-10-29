import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isOwner}) => {
    const userId = m.mentionedJid && m.mentionedJid[0]
? m.mentionedJid[0]
: m.quoted
? m.quoted.sender
: text;

    if (!isOwner) throw '☕ *Solo el creador puede usar este comando.*';
    if (!userId) throw '🍭 *Debes mencionar al usuario para mutear o desmutear.*';

    const user = global.db.data.users[userId] || {};
    user.mute = user.mute || false;

    if (command === 'mute') {
        if (user.mute) throw '⚠️ *El usuario fue moteado.*';
        user.mute = true;
        await conn.reply(m.chat, '🔇 *El usuario ha sido silenciado. En este grupo.*', m);
}

    if (command === 'unmute') {
        if (!user.mute) throw '⚠️ *El usuario ya fue desmuteado.*';
        user.mute = false;
        await conn.reply(m.chat, '🔊 *El usuario ya puede escribir en el grupo.*', m);
}

    global.db.data.users[userId] = user;
};

// 🧹 Elimina los mensajes de los usuarios silenciados
handler.before = async (m, { conn}) => {
    const sender = m.sender;
    const isMuted = global.db.data.users[sender]?.mute;

    if (isMuted &&!m.key.fromMe) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key});
} catch (e) {
            console.error('❌ Error al eliminar mensaje:', e);
}
}
};

handler.command = ['mute', 'unmute'];
handler.rowner = true; // ← Solo el owner puede usarlo

export default handler;
