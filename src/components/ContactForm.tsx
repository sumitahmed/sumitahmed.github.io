import { TerminalWidget } from "./TerminalWidget";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const FORMSPREE_ID = "xjknezzo"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST", body: data, headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setStatus("success"); form.reset(); } 
      else { setStatus("error"); }
    } catch (error) { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <TerminalWidget title="success.log" className="max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 px-6">
          <CheckCircle2 className="w-12 h-12 text-green-400" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Message Received</h3>
            <p className="text-hl-muted text-sm">I'll get back to you shortly.</p>
          </div>
          <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2 border-white/10 hover:bg-white/5 hover:text-white">
            Send Another
          </Button>
        </div>
      </TerminalWidget>
    );
  }

  return (
    <TerminalWidget title="compose_mail.sh" className="max-w-xl mx-auto">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* ✅ FIXED: Stack columns on mobile (grid-cols-1), side-by-side on desktop (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-mono text-hl-cyan">
              <User className="w-3 h-3" /> NAME
            </label>
            <Input name="name" placeholder="John Doe" required className="bg-black/20 border-white/10 focus:border-hl-cyan/50 font-mono" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-mono text-hl-cyan">
              <Mail className="w-3 h-3" /> EMAIL
            </label>
            <Input type="email" name="email" placeholder="john@example.com" required className="bg-black/20 border-white/10 focus:border-hl-cyan/50 font-mono" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-mono text-hl-cyan">
            <MessageSquare className="w-3 h-3" /> MESSAGE
          </label>
          <Textarea name="message" placeholder="I have a project idea..." required className="min-h-[150px] bg-black/20 border-white/10 focus:border-hl-cyan/50 font-mono resize-none" />
        </div>

        <Button type="submit" disabled={status === "submitting"} className="w-full bg-hl-cyan hover:bg-hl-cyan/80 text-hl-bg font-bold h-11">
          {status === "submitting" ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Transmission</>}
        </Button>
      </form>
    </TerminalWidget>
  );
}