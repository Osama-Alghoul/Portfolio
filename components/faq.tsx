import { ChevronDown } from "lucide-react";
import { JsonLdScript } from "./json-ld";

const faqs = [
  {
    question: "Where are you, and what hours do you work?",
    answer:
      "Gaza, Palestine (UTC+2). I overlap fully with Europe and the Gulf, and 4–5 hours with US East.",
  },
  {
    question: "How reliable is your setup?",
    answer:
      "I’ve worked full-time remotely since 2025. I have stable power, I keep backup power and a backup connection, and I send written updates before blockers become surprises.",
  },
  {
    question: "Can you be hired from Palestine?",
    answer:
      "Yes. I’m currently paid as a full-time remote contractor. I’m open to contract or employment, including through an employer-of-record.",
  },
  {
    question: "What do you do best?",
    answer:
      "Turning AI capabilities and Arabic/English requirements into fast, polished React and Next.js products.",
  },
  {
    question: "What’s your notice period?",
    answer: "None — I can start immediately.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          FAQ
        </h2>
        <p className="text-blue-400 text-center mb-12">
          Quick answers to what clients usually ask before working together
        </p>

        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-lg border border-blue-600/30 bg-black/60 px-5 open:border-[hsl(var(--gold)/0.5)] transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 text-gray-300 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLdScript data={faqJsonLd} />
    </section>
  );
}
