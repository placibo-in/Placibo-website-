import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Link = { label: string; href?: string; note: string };
type Stage = {
  id: string;
  title: string;
  intro?: string;
  groups: { heading: string; items: Link[] }[];
  goals?: string;
};

const stages: Stage[] = [
  {
    id: "beginner",
    title: "Beginner: understand cybersecurity",
    groups: [
      {
        heading: "Learning resources",
        items: [
          { label: "Cisco Networking Academy", href: "https://www.netacad.com", note: "cybersecurity fundamentals and the Junior Cybersecurity Analyst path" },
          { label: "Cisco Skills for All", href: "https://skillsforall.com", note: "introductory networking and cybersecurity" },
          { label: "Microsoft Learn", href: "https://learn.microsoft.com", note: "security, identity, compliance and cloud concepts" },
        ],
      },
      {
        heading: "Certifications to explore",
        items: [
          { label: "Cisco Certified Support Technician (CCST) Cybersecurity", note: "security principles, network and endpoint security, risk and incident handling" },
          { label: "Microsoft Security, Compliance, and Identity Fundamentals (SC-900)", note: "security, compliance and identity in Microsoft environments" },
        ],
      },
    ],
    goals: "Explain the CIA triad; distinguish threat, vulnerability, risk and incident; understand MFA, phishing, patching, backups and least privilege.",
  },
  {
    id: "foundation",
    title: "Foundation: networking, systems and security operations",
    groups: [
      {
        heading: "Learning resources",
        items: [
          { label: "Cisco Networking Academy", href: "https://www.netacad.com", note: "networking basics and analyst content" },
          { label: "OverTheWire Bandit", href: "https://overthewire.org/wargames/bandit/", note: "Linux command-line practice in a controlled environment" },
          { label: "Microsoft Learn", href: "https://learn.microsoft.com", note: "Windows, identity and cloud security modules" },
        ],
      },
      {
        heading: "Certifications to explore",
        items: [
          { label: "Cisco Cybersecurity Associate", note: "security monitoring, host-based and network intrusion analysis, incident response" },
          { label: "CompTIA Security+", href: "https://www.comptia.org/certifications/security", note: "broad baseline security credential" },
        ],
      },
    ],
    goals: "Understand IP addresses, DNS, ports, TCP/UDP, HTTP/HTTPS, Linux basics, logs and access control.",
  },
  {
    id: "intermediate",
    title: "Intermediate: build a role-aligned skill set",
    groups: [
      {
        heading: "IBM, Google and Microsoft",
        items: [
          { label: "IBM Cybersecurity Analyst Professional Certificate", note: "security tools, SIEM, threat intelligence, incident response and forensics" },
          { label: "Google Cybersecurity Certificate", href: "https://grow.google/certificates/cybersecurity/", note: "Linux, SQL, threats, detection and response, Python automation" },
          { label: "Microsoft Security Operations Analyst Associate (SC-200)", note: "threat investigation and hunting with Sentinel and Defender" },
        ],
      },
      {
        heading: "Web application security",
        items: [{ label: "PortSwigger Web Security Academy", href: "https://portswigger.net/web-security", note: "structured topics and authorised interactive labs" }],
      },
      {
        heading: "Hands-on platforms",
        items: [
          { label: "CyberDefenders", href: "https://cyberdefenders.org", note: "blue-team and digital-forensics challenges" },
          { label: "picoCTF", href: "https://picoctf.org", note: "practical challenges across security topics" },
          { label: "TryHackMe", href: "https://tryhackme.com", note: "guided labs; access varies by plan" },
          { label: "Hack The Box", href: "https://www.hackthebox.com", note: "practical exercises; access varies by plan" },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced: select a specialisation",
    intro: "Choose one primary direction and confirm current names, prerequisites and exams on the issuing organisation's website.",
    groups: [
      {
        heading: "Specialisations",
        items: [
          { label: "SOC / Blue Team", note: "Microsoft SC-200, Cisco cybersecurity pathways, IBM Cybersecurity Analyst" },
          { label: "Network Security", note: "Cisco CCNA and CCNP Security" },
          { label: "Cloud Security", href: "https://aws.amazon.com/certification/", note: "AWS Certification and Microsoft Credentials" },
          { label: "Web / Application Security", note: "PortSwigger Academy, then vendor or professional certifications" },
          { label: "Broad security baseline", href: "https://www.isc2.org/certifications/cissp", note: "CompTIA Security+; experienced professionals can research ISC2 CISSP" },
        ],
      },
    ],
  },
  {
    id: "expert",
    title: "Expert: deepen practice, not just certificates",
    intro: "Expertise comes from sustained practice, deeper specialisation and sound security decisions.",
    groups: [
      {
        heading: "Advanced credentials to research",
        items: [
          { label: "ISC2 CISSP", href: "https://www.isc2.org/certifications/cissp", note: "leadership and architecture; eligibility requirements apply" },
          { label: "ISC2 CCSP", href: "https://www.isc2.org/certifications/ccsp", note: "cloud security for experienced professionals" },
          { label: "Cisco Professional-level cybersecurity certifications", note: "security operations and engineering pathways" },
          { label: "CompTIA certification catalogue", href: "https://www.comptia.org/certifications", note: "specialist and advanced credentials" },
        ],
      },
    ],
    goals: "Read advisories and post-mortems; practise threat modelling, detection engineering and incident response in authorised environments; explain findings to technical and non-technical stakeholders; keep a record of your learning.",
  },
];

const routes = [
  ["New to cybersecurity", "Cisco fundamentals + Microsoft SC-900 learning", "CCST Cybersecurity or another entry-level credential"],
  ["SOC / Security Analyst", "IBM or Google cybersecurity certificate + log/SIEM fundamentals", "Microsoft SC-200 or Cisco associate-level path"],
  ["Network Security", "Networking foundations + Cisco cybersecurity learning", "CCNA / Cisco security pathway"],
  ["Cloud Security", "Cloud fundamentals + identity and access management", "Role-aligned AWS or Microsoft credentials"],
  ["Web / App Security", "PortSwigger Web Security Academy", "Authorised labs and relevant advanced training"],
];

export const CybersecurityRoadmapSection = () => (
  <section id="roadmap" className="bg-gray-50 py-16 md:py-20">
    <div className="container mx-auto max-w-5xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">CyberSecurity Certifications</h2>
      <p className="mt-3 max-w-5xl text-gray-600">
        <b>Terms and Conditions: </b>Five stages from beginner to expert. Exams, subscriptions and retakes may involve fees, so check each
        provider's official page for current requirements and pricing.
      </p>

      <Accordion type="single" collapsible defaultValue="beginner" className="mt-8 space-y-3">
        {stages.map((s, i) => (
          <AccordionItem key={s.id} value={s.id} className="rounded-lg border bg-white px-4">
            <AccordionTrigger className="text-left text-lg font-semibold">
              <span className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                {i + 1}
              </span>
              <span className="flex-1">{s.title}</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5">
              {s.intro && <p className="text-gray-600">{s.intro}</p>}
              {s.groups.map((g) => (
                <div key={g.heading}>
                  <h3 className="mb-1 font-semibold text-blue-700">{g.heading}</h3>
                  <ul className="list-disc space-y-1 pl-5">
                    {g.items.map((it) => (
                      <li key={it.label}>
                        {it.href ? (
                          <a href={it.href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline">
                            {it.label}
                          </a>
                        ) : (
                          <span className="font-medium">{it.label}</span>
                        )}
                        : {it.note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {s.goals && (
                <p className="rounded-md bg-gray-50 p-3 text-sm">
                  <strong>{s.id === "expert" ? "Development priorities: " : "Knowledge goals: "}</strong>
                  {s.goals}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mt-14 text-2xl font-bold text-gray-900">Choose your starting route</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border p-3">Your goal</th>
              <th className="border p-3">Suggested start</th>
              <th className="border p-3">Possible next step</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {routes.map((r) => (
              <tr key={r[0]}>
                {r.map((c) => (
                  <td key={c} className="border p-3 align-top">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Certification names, exam formats, prerequisites, fees and availability may change. Verify details with the
        official issuing body. No certification or course guarantees employment.
      </p>
    </div>
  </section>
);