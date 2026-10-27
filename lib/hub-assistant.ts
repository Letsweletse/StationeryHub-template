import { money, publicCatalogue, q, searchItems, type PublicItem } from './hub';
import { aiEnabled, askGeminiJson } from './llm';

export type AssistantReply = { text: string; matches: PublicItem[]; handoff: boolean };

const GREETING = /^(hi|hey|hello|dumela|good (morning|afternoon|evening)|howzit|yo)\b/i;
const HUMAN = /(agent|human|person|call me|speak to|talk to|someone)/i;
const DELIVERY = /(deliver|delivery|courier|shipping|ship)/i;
const PAY = /(pay|payment|bank|eft|orange money|myzaka|card)/i;
const INTL = /(export|international|outside botswana|zambia|zimbabwe|namibia|south africa|usd|dollar|rand)/i;

export async function answer(message: string, channel: 'web' | 'whatsapp', sender = ''): Promise<AssistantReply> {
  const msg = String(message || '').trim().slice(0, 500);
  const items = await publicCatalogue();
  let matches = searchItems(items, msg, channel === 'whatsapp' ? 5 : 6);
  // AI fallback: understand questions like "ink for my HP DeskJet 4828" and pick from our own catalogue.
  if (!matches.length && aiEnabled() && msg.split(/\s+/).length >= 2) {
    const list = items.map((i) => `${i.id}|${i.name}|${i.code || ''}${i.compat ? `|fits ${i.compat}` : ''}`).join('\n');
    const ai = await askGeminiJson(
      'You are the sales assistant of StationeryHub, an office supplies company in Botswana.\n' +
      `A customer wrote: <<${msg}>>\n` +
      `Our catalogue (id|name|code|fits):\n${list}\n` +
      'Return JSON {"ids":[up to 4 catalogue ids that answer the request, best first]}. Only use ids from the catalogue. ' +
      'If the customer names a printer model, pick the cartridges that printer uses. If nothing fits, return {"ids":[]}.',
      { timeoutMs: 12000 },
    );
    if (ai && Array.isArray(ai.ids)) {
      const byId = new Map(items.map((i) => [i.id, i]));
      matches = ai.ids.map((x: any) => byId.get(Number(x))).filter(Boolean).slice(0, 4) as PublicItem[];
    }
  }
  q(`insert into sh_chat_log (channel, sender, message, matched) values ($1,$2,$3,$4)`, [channel, sender.slice(0, 40), msg, matches.length]).catch(() => {});

  const lines: string[] = [];
  if (matches.length) {
    lines.push(matches.length === 1 ? 'Here is what we have:' : 'Here are the closest matches:');
    for (const m of matches) {
      lines.push(`• ${m.name}${m.code ? ` (${m.code})` : ''}: ${m.price != null ? money(m.price) : 'price on request'} · delivery ${m.eta.toLowerCase()} (Gaborone)`);
    }
    if (matches.some((m) => m.price == null)) lines.push('Items marked "price on request" are confirmed by our sales team, usually within the hour.');
    lines.push(channel === 'whatsapp'
      ? 'Reply with the quantity you need, e.g. "2 x CRG 067 Black", or get an instant quotation at stationeryhub.co.bw/quote'
      : 'Tap "Add to quote" to build an instant quotation.');
    return { text: lines.join('\n'), matches, handoff: false };
  }

  if (GREETING.test(msg) && msg.split(/\s+/).length <= 4) {
    return { text: 'Dumela! I can give you prices for ink, toner, cartridges and office supplies. Send a product name or code, e.g. "HP 47 black" or "Canon CRG 067".', matches: [], handoff: false };
  }
  if (INTL.test(msg)) {
    return { text: 'We supply international buyers. Build your quotation at stationeryhub.co.bw/quote and choose USD or ZAR; shipping is quoted separately once we know the destination. For large orders use the export enquiry on that page.', matches: [], handoff: true };
  }
  if (DELIVERY.test(msg)) {
    return { text: 'We deliver from our Gaborone head office and our Palapye and Francistown branches, and courier countrywide. Stocked items reach Gaborone the same or next working day and Palapye/Francistown in 1–2 days; items ordered in take 3–6 working days. International shipping is quoted per order.', matches: [], handoff: false };
  }
  if (PAY.test(msg)) {
    return { text: 'You can pay by EFT or bank deposit; our details are on your quotation. Send your items and we will issue a quotation straight away.', matches: [], handoff: true };
  }
  if (HUMAN.test(msg)) {
    return { text: 'Sure, a member of our sales team will reply shortly. You can also call or WhatsApp +267 75 560 140.', matches: [], handoff: true };
  }
  return {
    text: "I couldn't find that in our price list yet. Our sales team will check and reply shortly. Tip: the printer model or the code on the old cartridge helps us find the right one fast.",
    matches: [], handoff: true,
  };
}
