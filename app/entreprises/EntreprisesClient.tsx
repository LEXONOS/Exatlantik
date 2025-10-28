"use client";
style={{ backdropFilter: "blur(10px)", background: "rgba(2,6,23,0.6)", borderColor: COLORS.stroke }}>
<a href={TALLY_POST_ROLE_URL} target="_blank" rel="noreferrer" className="rounded-xl bg-teal-500/90 px-3 py-2 font-semibold text-slate-900">Post a Role</a>
<a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rounded-xl border px-3 py-2 font-semibold" style={{ borderColor: COLORS.stroke }}>Book 15‑min</a>
</div>
</div>
);
}


function JsonLd() {
const org = {
"@context": "https://schema.org",
"@type": "Organization",
name: "Exatlantik",
url: "https://exatlantik.com/",
logo: "https://exatlantik.com/og.jpeg",
contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "partners@exatlantik.com" }],
};
const service = {
"@context": "https://schema.org",
"@type": "Service",
name: "J‑1 Intern & Trainee Placement",
provider: { "@type": "Organization", name: "Exatlantik" },
areaServed: { "@type": "Country", name: "United States" },
termsOfService: "https://exatlantik.com/a-propos-legal",
};
const faq = {
"@context": "https://schema.org",
"@type": "FAQPage",
mainEntity: [
{
"@type": "Question",
name: "What stipend should we offer?",
acceptedAnswer: { "@type": "Answer", text: "Most hosts offer USD 2,000–3,500/mo for Interns; higher for Trainees depending on field and city." },
},
{
"@type": "Question",
name: "How long does it take?",
acceptedAnswer: { "@type": "Answer", text: "Typical 2–4 weeks to offer + sponsor docs; embassy timing varies by city." },
},
],
};


return (
<>
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
</>
);
}