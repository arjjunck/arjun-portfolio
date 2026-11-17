"use client";

import { useState } from "react";
import { contact, identity } from "@/content/portfolio";
import CvMenu from "./CvMenu";
import { Reveal } from "./fx/Reveal";
import Section from "./Section";

export default function Contact({ id, cv }: { id: string; cv: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = contact.primary_cta.href;
    }
  };

  return (
    <Section id={id} title={contact.headline} file="hire.http">
      <Reveal className="grid grid-cols-[minmax(0,1fr)] gap-4 rounded-[28px] bg-ink p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="text-[20px] leading-snug text-[#d8dde3]">{contact.text}</p>
          <p className="mt-8">
            <a href={contact.primary_cta.href} className="heading break-words text-[clamp(1.5rem,3.4vw,2.6rem)] underline decoration-2 underline-offset-[6px] hover:text-[#9fd3b5]">
              {identity.email}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="rounded-full border border-white/40 px-4 py-2 text-[14px] font-semibold hover:bg-white hover:text-ink">
              {copied ? "Copied" : "Copy address"}
            </button>
            <CvMenu className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-ink hover:bg-[#9fd3b5]" />
            <a href={identity.links.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/40 px-4 py-2 text-[14px] font-semibold hover:bg-white hover:text-ink">
              LinkedIn
            </a>
            <a href={identity.links.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/40 px-4 py-2 text-[14px] font-semibold hover:bg-white hover:text-ink">
              GitHub
            </a>
          </div>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </div>
        <pre className="code rounded-2xl bg-white/[0.06] p-5 text-[13px] text-[#d8dde3]" aria-hidden="true">
          <span className="text-[#cc7832]">POST</span> /api/hire HTTP/1.1{"\n"}
          Host: arjjunck.vercel.app{"\n"}
          Content-Type: application/json{"\n\n"}
          {"{\n"}
          {"  "}<span className="text-[#9876aa]">&quot;role&quot;</span>: <span className="text-[#a5d6a7]">&quot;Software Engineer, C# / .NET&quot;</span>,{"\n"}
          {"  "}<span className="text-[#9876aa]">&quot;location&quot;</span>: <span className="text-[#a5d6a7]">&quot;Anywhere in Ireland&quot;</span>,{"\n"}
          {"  "}<span className="text-[#9876aa]">&quot;permit&quot;</span>: <span className="text-[#a5d6a7]">&quot;Stamp 1G, Critical Skills eligible&quot;</span>
          {"\n}\n\n"}
          <span className="text-[#6a8759]">HTTP/1.1 200 OK</span>
          {"\n"}
          <span className="text-[#7f848e]">{`# or email ${identity.email} directly`}</span>
        </pre>
      </Reveal>
    </Section>
  );
}
