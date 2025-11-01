import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
["5491130964777", "ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ", true],
["5491124918653"],
]

global.mods = []
global.suittag = ["5491130964777"] 
global.prems = []


global.libreria = "Baileys"
global.vs = "^1.3.2|fedExz"
global.nameqr = "Kurumi-Bot"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.KurumiJadibts = true

global.botname = "🌾 𝙆𝙪𝙧𝙪𝙢𝙞 𝙈𝘿 🪐"
global.textbot = "꒰ ☕ ꒱ 🄺🅄🅁🅄🄼🄸‐🄼🄳"
global.dev = "𓂂𓏸 𐅹੭੭  𝙆𝙪𝙧𝙪𝙢𝙞 - 𝙈𝘿 ☕ ᦡᦡ"
global.author = "© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ"
global.etiqueta = "© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ꜰᴇᴅᴇxʏᴢ ꒰ ☕ ꒱ "
global.currency = "Yenes"
global.catalogo = fs.readFileSync('./settings/imagen/catalogo.jpg')


global.gp1 = "https://chat.whatsapp.com/BeFAyDGgDIR7e1kEkdFs8d?mode=wwt"
global.channel = "https://whatsapp.com/channel/0029VbBccU4545v2NVeKzN3U"
global.github = "https://dev-fedexy.wuaze.com/"
global.gmail = "fedelanyt20@gmail.com"
global.ch = {
ch1: "120363424055815484@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'config.js'"))
import(`${file}?update=${Date.now()}`)
})
