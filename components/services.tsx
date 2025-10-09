import { CustomButton } from "./custom-button";
import { ServiceCard } from "./service-card";

export default function Services() {
  const services = [
    {
      title: "Website Design Brought to Life",
      description:
        "Taking a design you love (or helping you create one) and turning it into a real, working website that people can visit online.",
      iconType: "design" as const,
    },
    {
      title: "Making Your Website Look Great on All Devices",
      description:
        "Ensuring your website looks good and works perfectly whether someone is using a computer, a tablet, or a mobile phone.",
      iconType: "responsive" as const,
    },
    {
      title: "Creating Websites That Are Easy to Use",
      description:
        "Building websites that are simple to navigate and understand, so your visitors have a good experience.",
      iconType: "usability" as const,
    },
    {
      title: "Building Fast and Responsive Websites",
      description:
        "Making sure your website loads quickly and responds smoothly when people click buttons or move around the page. This keeps visitors happy and engaged.",
      iconType: "performance" as const,
    },
    {
      title: "Building Interactive Features for Your Website",
      description:
        "Adding elements to your website that people can interact with, like buttons that do things, forms to fill out, special animations, and immersive 3D models that users can explore and interact with.",
      iconType: "interactive" as const,
    },
    {
      title: "Connecting Your Website to Other Online Tools",
      description:
        "Making sure your website can work with other services you might use, like payment systems for online stores or other online platforms.",
      iconType: "integration" as const,
    },
    {
      title: "Keeping Your Website Updated and Working Well",
      description:
        "Providing ongoing support to make sure your website stays secure, functions correctly, and looks up-to-date.",
      iconType: "maintenance" as const,
    },
    {
      title: "Creating Online Stores",
      description:
        "Building the part of an e-commerce website that customers see and interact with, like product pages, shopping carts, and the checkout process.",
      iconType: "ecommerce" as const,
    },
    {
      title: "Adding Map Features to Your Website",
      description:
        "If you have a physical location or want to show information on a map, I can integrate maps into your website.",
      iconType: "maps" as const,
    },
  ];
  return (
    <section id="services" className="py-20 bg-black/95">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          My Services
        </h2>
        <p className="text-blue-400 text-center max-w-3xl mx-auto mb-12">
          I offer a range of web development services to help bring your digital
          ideas to life
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              iconType={service.iconType}
              className="service-card"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <CustomButton href="#contact">Discuss Your Project</CustomButton>
        </div>
      </div>
    </section>
  );
}
