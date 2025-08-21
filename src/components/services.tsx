
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Code, PenSquare } from 'lucide-react';

const services = [
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photography',
    description: 'From portraits to products, I capture stunning visuals that tell your story and engage your audience.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Building fast, responsive, and beautiful websites that provide a seamless user experience.',
  },
  {
    icon: <PenSquare className="h-10 w-10 text-primary" />,
    title: 'Content Creation',
    description: 'Crafting compelling narratives and content strategies that build brands and connect with people.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl font-headline">My Services</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Leveraging a diverse skill set to deliver exceptional results across multiple creative fields.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center p-6 transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl font-semibold mb-2 font-headline">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
