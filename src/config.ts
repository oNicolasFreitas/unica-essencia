/* ═══════════════════════════════════════════════════════════
   PONTO ÚNICO DE CONFIGURAÇÃO
   Preencha as três linhas quando o gateway e o WhatsApp
   comercial existirem. Nada mais precisa mudar no projeto.
   ═══════════════════════════════════════════════════════════ */
export const CHECKOUT = {
  essencial: '', // AVISO: placeholder — substituir por dado real (ex.: https://www.asaas.com/c/xxxxxxxx)
  unica: '',     // AVISO: placeholder — substituir por dado real (ex.: https://www.asaas.com/c/yyyyyyyy)
}

export const WHATSAPP = '' // AVISO: placeholder — substituir por dado real (ex.: 5547999999999)

const WHATSAPP_MSG = 'Quero tirar uma dúvida sobre a Única Essência.'

export function whatsappHref() {
  return WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}` : '#duvida'
}

export function checkoutHref(lote: keyof typeof CHECKOUT) {
  return CHECKOUT[lote] || '#duvida'
}

/** Atributos de link externo só quando o destino existe. */
export function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}
}
