import data from "@/data.json";

const SITE_URL = "https://www.osssghoul.com";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: data.personal.name_en,
        alternateName: data.personal.name,
        url: SITE_URL,
        image: `${SITE_URL}/Me.png`,
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
        sameAs: [
          data.contact.github,
          data.contact.linkedin,
          data.contact.Facebook,
          data.contact.Instagram,
          data.contact.Telegram,
          data.contact.Steam,
          data.contact.Discord,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${data.personal.name_en} - Portfolio`,
        description: data.personal.bio,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
