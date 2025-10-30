import axios from 'axios';

const handler = async (m, { command, conn}) => {
  try {
    const res = await axios.get('https://api.kirito.my/api/meme?apikey=by_deylin');
    const memes = res.data.memes;

    if (!memes || memes.length === 0) throw 'No se encontraron memes';

    // Selecciona un meme aleatorio
    const memeUrl = memes[Math.floor(Math.random() * memes.length)];

    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key}});

    await conn.sendMessage(m.chat, {
      image: { url: memeUrl},
      caption: '👻 Aquí tienes un meme...',
      footer: 'Kurumi - Memes',
      buttons: [
        { buttonId: '.meme', buttonText: { displayText: 'Siguiente'}, type: 1}
      ],
      headerType: 4
}, { quoted: m});

} catch (e) {
    m.reply('⚠️ Las sombras no pudieron encontrar un meme...');
    console.error(e);
}
};

handler.command = handler.help = ['meme'];
handler.tags = ['diversión', 'humor'];
export default handler;
