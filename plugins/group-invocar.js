
import { delay } from "@whiskeysockets/baileys"

const handler = async (msg, { conn }) => {
  try {
    const chatId = msg.key.remoteJid;
    const sender = (msg.key.participant || msg.key.remoteJid).replace(/[^0-9]/g, '');
    const isGroup = chatId.endsWith('@g.us');

    await conn.sendMessage(chatId, { react: { text: '🕰️', key: msg.key } }); // Cambiado a emoji temático

    if (!isGroup) {
      await conn.sendMessage(chatId, {
        text: `⏳ Este comando solo puede ser invocado en el tiempo presente (grupo).`, // Mensaje temático
        quoted: msg
      });
      return;
    }

    const metadata = await conn.groupMetadata(chatId);
    const participants = metadata.participants;
    const mentionIds = participants.map(p => p.id);

    const messageText = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
    const args = messageText.trim().split(' ').slice(1);
    const extraMsg = args.join(' ');

    let texto = `\`\`\`ZAFKIEL: TIEMPO LLAMADO\`\`\`

`; // Encabezado temático
    texto += `✐ Grupo: *${metadata.subject}*
`;
    texto += `ⴵ Miembros: *${participants.length}*
`;
    if (extraMsg) texto += `✰ Mensaje: *${extraMsg}*
`;
    texto += `
❒ Menciones:
`;
    texto += participants.map(p => `» @${p.id.split('@')[0]}`).join('
');
    texto += `


❒ Versión: *${vs}*`; // Asumo que 'vs' es una variable definida en el contexto original

    await conn.sendMessage(chatId, {
      text: texto,
      mentions: mentionIds
    }, { quoted: msg });

  } catch (error) {
    console.error('❌ Error en el comando invocar:', error);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `🕰️ El tiempo se ha corrompido al intentar ejecutar el comando *invocar*.`, // Mensaje de error temático
      quoted: msg
    });
  }
};

handler.tags = ['grupo'];
handler.help = ['invocar <mensaje> (Estilo Zafkiel)']; // Help temático
handler.command = ['tagall', 'invocar', 'todos'];
handler.group = true;
handler.admin = true;

export default handler
