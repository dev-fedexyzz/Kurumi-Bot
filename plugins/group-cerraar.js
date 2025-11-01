import { delay } from "@whiskeysockets/baileys"

let handler = async (m, { conn, text, args, participants, isAdmin, isBotAdmin}) => {
  if (!m.isGroup) {
    await conn.sendMessage(m.chat, { text: '⚠️ Este comando solo se puede ejecutar en un dominio temporal (grupo).'})
    return
}

  if (!isAdmin) {
    await conn.sendMessage(m.chat, { text: '🍒 Solo los poseedores del tiempo pueden usar este comando.'})
    return
}

  if (!isBotAdmin) {
    await conn.sendMessage(m.chat, { text: '🍒 Mi reloj no me permite operar aquí sin permiso.'})
    return
}

  if (!args[0]) {
    await conn.sendMessage(m.chat, { text: '🍒 Usa el comando así: *!cerrar 10 segundos*, *!cerrar 5 minutos* o *!cerrar 1 hora*'})
    return
                                    }

  let tiempoTexto = text.toLowerCase()
  let tiempoMs
  let unidad = ''

  if (tiempoTexto.includes("segundo")) {
    let segundos = parseInt(args[0])
    if (isNaN(segundos) || segundos <= 0) {
      await conn.sendMessage(m.chat, { text: '🍒 Por favor ingresa un número válido, maestro.'})
      return
}
    tiempoMs = segundos * 1000
    unidad = 'segundo(s)'
} else if (tiempoTexto.includes("minuto")) {
    let minutos = parseInt(args[0])
    if (isNaN(minutos) || minutos <= 0) {
      await conn.sendMessage(m.chat, { text: '🍒 Por favor ingresa un número válido, maestro.'})
      return
}
    tiempoMs = minutos * 60 * 1000
    unidad = 'minuto(s)'
} else if (tiempoTexto.includes("hora")) {
    let horas = parseInt(args[0])
    if (isNaN(horas) || horas <= 0) {
      await conn.sendMessage(m.chat, { text: '☕ Por favor ingresa un número válido de horas.'})
      return
}
    tiempoMs = horas * 60 * 60 * 1000
    unidad = 'hora(s)'
} else {
    await conn.sendMessage(m.chat, { text: '🍃 Por favor, Especifica si son segundos, minutos o horas.'})
    return
}

  await conn.groupSettingUpdate(m.chat, 'announcement')
  await conn.sendMessage(m.chat, {
    text: `🕰️ El tiempo se ha detenido en este chat. ¡Zona de Announce activada por ${args[0]} ${unidad}! Reabriré el flujo temporal después.`
})

  await delay(tiempoMs)

  await conn.groupSettingUpdate(m.chat, 'not_announcement')
  await conn.sendMessage(m.chat, { text: '✅ El flujo temporal se ha restaurado. ¡Bienvenidos de nuevo!'})
}

// ✅ Registro completo para que el bot lo reconozca y lo muestre en!help
handler.help = ['cerrar <número> segundos/minutos/horas']
handler.tags = ['grupo']
handler.command = ['cerrar']
handler.group = true
handler.admin = true

export default handler
