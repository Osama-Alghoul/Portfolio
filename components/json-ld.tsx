import data from "@/data.json";
import { SITE_URL, personJsonLd } from "@/lib/site";

/** Renders Schema.org JSON-LD safely: `<` is escaped so content can't close the script tag. */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Site-wide Person + WebSite graph for the portfolio pages. */
export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...personJsonLd,
        jobTitle: data.personal.title,
        description: data.personal.bio,
        email: `mailto:${data.contact.email}`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "PS",
        },
        knowsAbout: [
          ...data.skills.frontend,
          ...data.skills.backend,
          ...data.skills.AI,
          ...data.skills.Architecture,
          ...data.skills.tools,
        ],
        sameAs: [...personJsonLd.sameAs, data.contact.Steam, data.contact.Discord],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${data.personal.name_en} (${data.personal.handle}) - Portfolio`,
        description: data.personal.bio,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return <JsonLdScript data={jsonLd} />;
}
