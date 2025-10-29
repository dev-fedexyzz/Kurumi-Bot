import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
  global.canalIdM = ["120363424055815484@newsletter", "120363424055815484@newsletter"]
  global.canalNombreM = ["꒰ ☕ ꒱  ᴋᴜʀᴜᴍɪ - ᴄʜᴀɴɴᴇʟ ᴏғғɪᴄɪᴀʟ 🍭 ᦡᦡ", "꒰ ☕ ꒱  ᴋᴜʀᴜᴍɪ - ᴄʜᴀɴɴᴇʟ ᴏғғɪᴄɪᴀʟ 🍒 ᦡᦡ"]
  global.channelRD = await getRandomChannel()

  global.d = new Date(new Date + 3600000)
  global.locale = 'es'
  global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
  global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
  global.mes = d.toLocaleDateString('es', { month: 'long' })
  global.año = d.toLocaleDateString('es', { year: 'numeric' })
  global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

  var canal = 'https://whatsapp.com/channel/0029VbBccU4545v2NVeKzN3U'  
  var gp1 = 'https://chat.whatsapp.com/BeFAyDGgDIR7e1kEkdFs8d?mode=wwt'
  var git = 'https://github.com/dev-fedexyzz/Kurumi-MD'
  var sitio = 'https://dev-fedexy.wuaze.com/' 
  var correo = 'fedelanyt20@gmail.com'
  global.redes = pickRandom([canal, gp1, git, sitio, correo])

  global.nombre = m.pushName || 'Anónimo'
  global.packsticker = `☕ Stickers\n🍭 Usuario » ${nombre}\n✦ Bot » ${botname}`
  global.packsticker2 = `\n\n${dev}`
  
  global.fkontak = { 
    key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net" 
  }
}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * global.canalIdM.length)
  let id = global.canalIdM[randomIndex]
  let name = global.canalNombreM[randomIndex]
  return { id, name }
}
