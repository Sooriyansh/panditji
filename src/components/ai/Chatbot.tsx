"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import type { AssistantAction, AssistantReply, BookingPrefill, ChatMessage } from "@/lib/ai/types";

type DisplayMessage = ChatMessage & { id: string; action?: AssistantAction };
const welcome: DisplayMessage = { id: "welcome", role: "assistant", content: "नमस्ते। मैं पंडित सुमित शर्मा जी की वेबसाइट का AI सहायक हूँ। पूजा, ज्योतिषीय सेवाओं और बुकिंग से जुड़ी जानकारी में मैं आपकी सहायता कर सकता हूँ।" };
const suggestions = ["🔱 पूजा की जानकारी", "📅 पूजा बुक करें", "📜 कुंडली consultation", "🕉️ दोष के बारे में जानें", "📞 पंडित जी से संपर्क करें"];

function ChatIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-7 w-7"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.48 8.4 8.4 0 0 1-3.32-.8L4 19.5l1.36-3.69A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" strokeLinecap="round" strokeWidth="2.5" /></svg>; }
function CloseIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5"><path d="m6 6 12 12M18 6 6 18" /></svg>; }
function MinimizeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5"><path d="M5 12h14" /></svg>; }

function actionLink(action: AssistantAction) {
  if (action.type === "OPEN_SERVICE_PAGE") return { href: action.data.route, label: "पूजा की जानकारी देखें" };
  if (action.type === "START_BOOKING") return { href: `/online-puja${action.data.pujaService ? `?puja=${encodeURIComponent(action.data.pujaService)}` : ""}`, label: "बुकिंग form खोलें" };
  if (action.type === "CONTACT_PANDIT") return { href: "/contact", label: "संपर्क विकल्प देखें" };
  if (action.type === "OPEN_CONSULTATION") return { href: "/book-consultation", label: "परामर्श बुक करें" };
  if (action.type === "SHOW_FAQ") return { href: "/puja-services", label: "पूजा सेवाएँ देखें" };
  return undefined;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false); const [messages, setMessages] = useState<DisplayMessage[]>([welcome]); const [draft, setDraft] = useState(""); const [loading, setLoading] = useState(false); const [pendingPrefill, setPendingPrefill] = useState<BookingPrefill>();
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null); const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const send = async (content: string) => {
    const question = content.trim(); if (!question || loading) return;
    const userMessage: DisplayMessage = { id: crypto.randomUUID(), role: "user", content: question }; const history = [...messages, userMessage].filter((message) => message.id !== "welcome").slice(-10);
    setMessages((current) => [...current, userMessage]); setDraft(""); setLoading(true); setPendingPrefill(undefined);
    try {
      const requestMessages: ChatMessage[] = history.map(({ role, content: messageContent }) => ({ role, content: messageContent }));
      const response = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: requestMessages }) });
      const body = await response.json() as AssistantReply & { message?: string };
      if (!response.ok || !body.message) throw new Error("Chat unavailable");
      const next: DisplayMessage = { id: crypto.randomUUID(), role: "assistant", content: body.message, action: body.action };
      setMessages((current) => [...current, next]); if (body.action?.type === "PREFILL_BOOKING_FORM") setPendingPrefill(body.action.data);
    } catch { setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: "अभी AI सेवा से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें या पंडित जी से सीधे संपर्क करें।", action: { type: "CONTACT_PANDIT", data: {} } }]); }
    finally { setLoading(false); }
  };
  const submit = (event: FormEvent) => { event.preventDefault(); void send(draft); };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(draft); } };
  const confirmPrefill = () => { if (!pendingPrefill) return; try { sessionStorage.setItem("panditji-booking-draft", JSON.stringify(pendingPrefill)); } catch { /* Booking form remains available if storage is blocked. */ } router.push("/online-puja?assistant=true"); };

  return <><button type="button" onClick={() => setOpen(true)} aria-label="पंडित जी AI सहायक खोलें" className={`fixed bottom-[92px] right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#8b3516] text-white shadow-[0_10px_28px_rgba(91,40,14,0.32)] transition hover:-translate-y-1 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2 lg:bottom-6 lg:right-6 ${open ? "pointer-events-none scale-75 opacity-0" : ""}`}><ChatIcon /></button>
    {open && <section role="dialog" aria-modal="true" aria-label="पंडित जी AI सहायक" className="fixed inset-x-3 bottom-[86px] z-[60] flex h-[min(680px,calc(100dvh-104px))] flex-col overflow-hidden rounded-3xl border border-[#e3c697] bg-[#fffdf9] shadow-[0_22px_70px_rgba(56,25,8,0.28)] lg:inset-x-auto lg:bottom-6 lg:right-6 lg:h-[640px] lg:w-[420px]">
      <header className="flex items-start justify-between gap-3 bg-gradient-to-r from-[#7e3214] to-[#a9481e] px-5 py-4 text-white"><div><h2 className="text-lg font-bold">पंडित जी AI सहायक</h2><p className="mt-1 text-xs leading-5 text-amber-100">पूजा, ज्योतिष और बुकिंग से जुड़ी जानकारी के लिए पूछें</p></div><div className="flex gap-1"><button type="button" onClick={() => setOpen(false)} aria-label="chatbot छोटा करें" className="grid h-9 w-9 place-items-center rounded-lg text-amber-50 hover:bg-white/15"><MinimizeIcon /></button><button type="button" onClick={() => setOpen(false)} aria-label="chatbot बंद करें" className="grid h-9 w-9 place-items-center rounded-lg text-amber-50 hover:bg-white/15"><CloseIcon /></button></div></header>
      <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto bg-[#fffaf2] px-4 py-5"><div className="grid gap-4">{messages.map((message) => <div key={message.id} className={message.role === "user" ? "ml-8 rounded-2xl rounded-br-md bg-[#8b3516] px-4 py-3 text-sm leading-6 text-white" : "mr-4 rounded-2xl rounded-bl-md border border-[#ead6b9] bg-white px-4 py-3 text-sm leading-6 text-[#603014] shadow-sm"}><p className="whitespace-pre-wrap">{message.content}</p>{message.action && message.action.type !== "PREFILL_BOOKING_FORM" && actionLink(message.action) && <Link href={actionLink(message.action)!.href} className="mt-3 inline-flex min-h-9 items-center rounded-lg bg-[#fff0d2] px-3 text-xs font-bold text-[#79330f] hover:bg-[#f8dfae]">{actionLink(message.action)!.label} →</Link>}</div>)}
        {loading && <div aria-live="polite" className="mr-12 w-fit rounded-2xl rounded-bl-md border border-[#ead6b9] bg-white px-4 py-3 text-sm font-medium text-[#70401f]"><span className="inline-flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce [animation-delay:120ms]">•</span><span className="animate-bounce [animation-delay:240ms]">•</span></span> सोच रहा हूँ...</div>}
        {pendingPrefill && <div className="rounded-2xl border border-[#e4bd78] bg-[#fff4dc] p-4 text-sm text-[#633015]"><p className="font-bold">क्या आप इस जानकारी से booking form भरना चाहते हैं?</p><p className="mt-2 text-xs leading-5">आप form खुलने के बाद सभी जानकारी देख और बदल सकते हैं।</p><div className="mt-3 flex gap-2"><button type="button" onClick={confirmPrefill} className="min-h-10 rounded-xl bg-[#8b3516] px-3 font-bold text-white hover:bg-[#74270e]">हाँ, Form भरें</button><button type="button" onClick={() => setPendingPrefill(undefined)} className="min-h-10 rounded-xl border border-[#c9934d] px-3 font-bold text-[#6b3215] hover:bg-amber-50">जानकारी बदलें</button></div></div>}</div>
        {messages.length === 1 && !loading && <div className="mt-5"><p className="mb-2 text-xs font-bold tracking-wide text-[#9c6a3d]">मैं आपकी किस प्रकार सहायता करूँ?</p><div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void send(suggestion)} className="rounded-full border border-[#e2c186] bg-white px-3 py-2 text-xs font-bold text-[#70401f] hover:bg-amber-50">{suggestion}</button>)}</div></div>}</div>
      <form onSubmit={submit} className="border-t border-amber-100 bg-white p-3"><label htmlFor="ai-chat-input" className="sr-only">अपना प्रश्न लिखें</label><div className="flex items-end gap-2 rounded-2xl border border-[#dfc6a4] bg-[#fffdf9] p-2 focus-within:border-[#8b3516] focus-within:ring-2 focus-within:ring-[#f3d8b1]"><textarea ref={inputRef} id="ai-chat-input" value={draft} onChange={(event) => setDraft(event.target.value.slice(0, 1500))} onKeyDown={keyDown} rows={1} placeholder="अपना प्रश्न लिखें..." className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-[#51230f] outline-none placeholder:text-[#9a806c]" /><button type="submit" disabled={!draft.trim() || loading} aria-label="संदेश भेजें" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#8b3516] text-lg font-bold text-white transition hover:bg-[#74270e] disabled:cursor-not-allowed disabled:opacity-45">↑</button></div></form>
    </section>}</>;
}
