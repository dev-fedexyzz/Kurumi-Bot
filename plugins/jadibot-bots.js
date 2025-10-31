import ws from 'ws'
import { join} from 'path'
import fs from 'fs'

let handler = async (m, { conn}) => {
  const mainBotConn = global.conn
  if (!global.conns ||!Array.isArray(global.conns)) global.conns = []
  global.conns = global.conns.filter(subConn => {
    return subConn.user?.jid && subConn.ws?.socket?.readyState === ws.OPEN
})

  let totalSubs = global.conns.length
  const totalPrincipales = 1
  const totalBots = totalPrincipales + totalSubs
  const sesiones = totalBots.toLocaleString()

  let botsEnGrupo = 0
  let botsEnGrupoDetalles = []

  if (mainBotConn.chats && mainBotConn.chats[m.chat]) {
    botsEnGrupo++
    botsEnGrupoDetalles.push({
      jid: mainBotConn.user.jid,
      tipo: '🌾 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡'
})
}

  for (let subConn of global.conns) {
    if (subConn.chats && subConn.chats[m.chat]) {
      botsEnGrupo++
      botsEnGrupoDetalles.push({
        jid: subConn.user.jid,
        tipo: '🌿 𝙎𝙪𝙗‐𝘽𝙤𝙩'
})
}
}

  let txt = `🪐 *𝙎𝙐𝘽‐𝘽𝙊𝙏 𝘼𝘾𝙏𝙄𝙑𝙊𝙎 – 𝙆𝙪𝙧𝙪𝙢𝙞‐𝙈𝘿*\n\n`
  txt += `🌾 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡𝙚𝙨: *${sesiones}*\n`
  txt += `🌿 𝘼𝙘𝙩𝙞𝙫𝙤𝙨 𝙚𝙣 𝙚𝙨𝙩𝙚 𝙜𝙧𝙪𝙥𝙤: *${botsEnGrupo}*\n\n`

  if (botsEnGrupo> 0) {
    for (let b of botsEnGrupoDetalles) {
      const numero = b.jid.split('@')[0]
      txt += `🜸 *[${b.tipo}]* » @${numero}\n`
}
} else {
    txt += '😿 𝙉𝙤 𝙝𝙖𝙮 𝙗𝙤𝙩𝙨 𝙖𝙘𝙩𝙞𝙫𝙤𝙨 𝙚𝙣 𝙚𝙨𝙩𝙚 𝙜𝙧𝙪𝙥𝙤.\n'
}

  const mentions = botsEnGrupoDetalles.map(b => b.jid)

  await conn.sendMessage(m.chat, { text: txt, mentions}, { quoted: m, contextInfo: global.rcanal})
}

handler.command = ['activos', 'bots']
handler.group = true
export default handler
