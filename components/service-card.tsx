import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSvgIcon } from "./animated-svg-icon";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  iconType:
    | "design"
    | "responsive"
    | "usability"
    | "performance"
    | "interactive"
    | "integration"
    | "maintenance"
    | "ecommerce"
    | "maps";
  className?: string;
}

export function ServiceCard({
  title,
  description,
  iconType,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "bg-blue-950/30 border-blue-800 hover:border-gold transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group",
        className
      )}
    >
      <CardContent className="p-6 flex flex-col items-center text-center md:items-start md:text-left">
        <div className="mb-4 text-blue-400 group-hover:text-gold transition-colors duration-300">
          <AnimatedSvgIcon type={iconType} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gold">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}
