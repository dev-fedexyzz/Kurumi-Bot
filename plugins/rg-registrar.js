import fetch from 'node-fetch'
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let name2 = await conn.getName(m.sender)
  let Reg = /^([^\n]+)\.([0-9]+)$/

  if (user.registered === true) {
    return m.reply(`🌾 Ya te encuentras registrado.\n\n¿Quieres volver a registrarte?\nUsa: *${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) {
    return m.reply(`☕ Formato incorrecto\nUso:\n*${usedPrefix + command} nombre.edad*\nEjemplo:\n*${usedPrefix + command} ${name2}.19*`)
  }

  let [_, name, age] = text.match(Reg)
  if (!name) return m.reply('🪐 El nombre no puede estar vacío.')
  if (!age) return m.reply('❄️ La edad no puede estar vacía.')
  if (name.length >= 30) return m.reply('💛 El nombre es demasiado largo.')
  age = parseInt(age)
  if (age > 100 || age < 5) return m.reply('🌾 La edad ingresada no es válida.')

  user.name = name.trim()
  user.age = age
  user.registered = true

  const fondo = 'https://files.catbox.moe/c65bk7.jpg'
  const thumb = await (await fetch(fondo)).buffer()

  const media = await prepareWAMessageMedia(
    {
      document: { url: fondo },
      mimetype: 'application/pdf',
      fileName: ' ',
      jpegThumbnail: thumb
    },
    { upload: conn.waUploadToServer }
  )

  const caption = `
\`\`\`YA ESTAS REGISTRADO CORRECTAMENTE 

𝖭𝗈𝗆𝖻𝗋𝖾: ${name}

𝖤𝖽𝖺𝖽: ${age}

𝖴𝗌𝗎𝖺𝗋𝗂𝗈: @${m.sender.split('@')[0]}

𝖡𝗈𝗍: Kurumi-Bot\`\`\`

> gracias por usar el bot
`

  const interactiveMessage = {
    header: {
      title: '',
      hasMediaAttachment: true,
      documentMessage: media.documentMessage
    },
    body: { text: caption },
    footer: { text: ' ' },
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
                  { header: '📚MENU COMPLETO', title: 'Comandos', id: '.allmenu' },
                  { header: '🔕 Eliminar registro ', title: 'Eliminar registro', id: '.unreg' },
                  { header: '📚 Información sobre el server', title: 'Sobre el server', id: '.estado' },
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
        title: '☁️ Registro Exitoso',
        thumbnail: await (await fetch(icono)).buffer(),
        mediaType: 1,
        showAdAttribution: false
      }
    }
  }

  const msg = generateWAMessageFromContent(
    m.chat,
    { viewOnceMessage: { message: { interactiveMessage } } },
    { userJid: m.sender, quoted: m }
  )

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['reg']
handler.tags = ['info']
handler.command = ['verificar', 'reg', 'registrar']

export default handler
