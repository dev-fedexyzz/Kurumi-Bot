import { delay} from "@whiskeysockets/baileys"

let handler = async (m, { conn, text, args, participants, isAdmin, isBotAdmin}) => {
  if (!m.isGroup) {
    await conn.sendMessage(m.chat, { text: '⚠️ Este comando solo se puede usar en grupos'})
    return
}

  if (!isAdmin) {
    await conn.sendMessage(m.chat, { text: '🍒 Ternura olo los admins pueden usar este comando.'})
    return
}

  if (!isBotAdmin) {
    await conn.sendMessage(m.chat, { text: '🍒 No soy admin en el grupo.'})
    return
}

  if (!args[0]) {
    await conn.sendMessage(m.chat, { text: '🍒 Usa el comando asi: *!cerrar 10 segundos*, *!cerrar 5 minutos* o *!cerrar 1 hora*'})
    return
                                    }

  let tiempoTexto = text.toLowerCase()
  let tiempoMs

  if (tiempoTexto.includes("segundo")) {
    let segundos = parseInt(args[0])
    if (isNaN(segundos) || segundos <= 0) {
      await conn.sendMessage(m.chat, { text: '🍒 Por favor ingresa un número válido.'})
      return
}
    tiempoMs = segundos * 1000
} else if (tiempoTexto.includes("minuto")) {
    let minutos = parseInt(args[0])
    if (isNaN(minutos) || minutos <= 0) {
      await conn.sendMessage(m.chat, { text: '🍒 Por favor ingresa un número válido'})
      return
}
    tiempoMs = minutos * 60 * 1000
} else if (tiempoTexto.includes("hora")) {
    let horas = parseInt(args[0])
    if (isNaN(horas) || horas <= 0) {
      await conn.sendMessage(m.chat, { text: '☕ Por favor ingresa un número válido de horas'})
      return
}
    tiempoMs = horas * 60 * 60 * 1000
} else {
    await conn.sendMessage(m.chat, { text: '🍃 Por favor, Especifica si son segundos, minutos o horas.'})
    return
}

  await conn.groupSettingUpdate(m.chat, 'announcement')
  await conn.sendMessage(m.chat, {
    text: `🚪 Grupo cerrado por ${args[0]} ${tiempoTexto.includes("segundo")? "segundo(s)": tiempoTexto.includes("minuto")? "minuto(s)": "hora(s)"}. Se abrirá automáticamente después bro.`
})

  await delay(tiempoMs)

  await conn.groupSettingUpdate(m.chat, 'not_announcement')
  await conn.sendMessage(m.chat, { text: '✅ El grupo a sido abierto...'})
}

// ✅ Registro completo para que el bot lo reconozca y lo muestre en!help
handler.help = ['cerrar <número> segundos/minutos/horas']
handler.tags = ['grupo']
handler.command = ['cerrar']
handler.group = true
handler.admin = true

export default handler
