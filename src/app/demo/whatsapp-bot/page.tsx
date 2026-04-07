"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, RotateCcw, Copy, CheckCircle, MessageCircle, User, Bot, Zap } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Lead {
  jobType: string;
  area: string;
  urgency: "emergency" | "scheduled";
  name: string;
  phone: string;
  summary: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! 👋 Welcome to Zeus Electrical. I'm here to help you book a job or get a quick quote.\n\nWhat electrical work do you need done today?",
  timestamp: new Date(),
};

export default function WhatsAppBotPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, lead]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/whatsapp-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.text,
            timestamp: new Date(),
          },
        ]);
      }

      if (data.lead) {
        setLead(data.lead);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I'm having a technical issue. Please call us on +27 60 790 2941.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: new Date() }]);
    setLead(null);
    setInput("");
  };

  const formatWhatsAppMessage = (l: Lead) => {
    return `*New Lead — Zeus Electrical*\n\n` +
      `👤 *Name:* ${l.name}\n` +
      `📞 *Phone:* ${l.phone}\n` +
      `🔧 *Job:* ${l.jobType}\n` +
      `📍 *Area:* ${l.area}\n` +
      `⚡ *Urgency:* ${l.urgency === "emergency" ? "🚨 EMERGENCY" : "📅 Scheduled"}\n` +
      `📝 *Summary:* ${l.summary}\n\n` +
      `_Captured via Zeus Electrical WhatsApp Bot_`;
  };

  const copyToClipboard = async () => {
    if (!lead) return;
    await navigator.clipboard.writeText(formatWhatsAppMessage(lead));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full px-4 py-2 mb-4">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">WhatsApp Bot Demo</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI-Powered WhatsApp Intake Bot</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            This simulates what customers experience when they WhatsApp Zeus Electrical. The AI extracts structured lead data from natural conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              {/* WhatsApp-style header */}
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#F5C518] flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-[#0C2340]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Zeus Electrical Bot</div>
                  <div className="text-xs text-white/70">{loading ? "typing..." : "online"}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className="text-white/70 hover:text-white hover:bg-white/10 text-xs gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
              </div>

              {/* Messages */}
              <div
                className="h-[420px] overflow-y-auto p-4 space-y-3"
                style={{ background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="h-6 w-6 rounded-full bg-[#F5C518] flex items-center justify-center flex-shrink-0 mb-1">
                          <Bot className="h-3 w-3 text-[#0C2340]" />
                        </div>
                      )}
                      {msg.role === "user" && (
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mb-1">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm ${
                            msg.role === "user"
                              ? "bg-[#DCF8C6] text-gray-800 rounded-br-sm"
                              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div className={`text-[10px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : ""}`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2">
                      <div className="h-6 w-6 rounded-full bg-[#F5C518] flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-[#0C2340]" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t p-3 bg-background flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={loading || !!lead}
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || !!lead}
                  size="icon"
                  className="bg-[#075E54] hover:bg-[#075E54]/90 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Suggested messages */}
            {!lead && messages.length <= 2 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "My power keeps tripping",
                  "I need a COC certificate",
                  "I want solar panels installed",
                  "Emergency — sparks from my DB board!",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); }}
                    className="text-xs bg-white dark:bg-gray-800 border rounded-full px-3 py-1.5 hover:bg-muted transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lead Card */}
          <div className="space-y-4">
            <Card className={`transition-all ${lead ? "border-green-500/50 shadow-lg" : "opacity-50"}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className={`h-5 w-5 ${lead ? "text-green-500" : "text-muted-foreground"}`} />
                  Captured Lead
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lead ? (
                  <>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{lead.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{lead.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Job Type</span>
                        <span className="font-medium">{lead.jobType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area</span>
                        <span className="font-medium">{lead.area}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Urgency</span>
                        <Badge
                          variant={lead.urgency === "emergency" ? "destructive" : "secondary"}
                          className={lead.urgency === "emergency" ? "" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}
                        >
                          {lead.urgency === "emergency" ? "EMERGENCY" : "Scheduled"}
                        </Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-muted-foreground text-xs">Summary</span>
                        <p className="text-sm mt-1">{lead.summary}</p>
                      </div>
                    </div>

                    <Button
                      onClick={copyToClipboard}
                      className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      {copied ? (
                        <><CheckCircle className="h-4 w-4" /> Copied!</>
                      ) : (
                        <><Copy className="h-4 w-4" /> Send to Owner (Copy)</>
                      )}
                    </Button>

                    <Button
                      onClick={reset}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Start New Conversation
                    </Button>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    Lead data will appear here once the bot has collected all customer information.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#0C2340] text-white">
              <CardContent className="p-4 text-xs space-y-2">
                <div className="font-semibold text-[#F5C518]">How it works</div>
                <div className="text-white/70 space-y-1">
                  <p>1. Customer messages on WhatsApp</p>
                  <p>2. AI bot gathers job details</p>
                  <p>3. Lead card auto-generated</p>
                  <p>4. Owner gets instant notification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
