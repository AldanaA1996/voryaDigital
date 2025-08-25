
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Code, PenSquare } from 'lucide-react';

const services = [
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Fotografía',
    description: 'Desde retratos hasta fotografía de producto, capturo los mejores visuales para contar tu historia y que puedas contectar con tu audiencia.',
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Sitios web rápidos, intuitivos y atractivos que ofrezcan una experiencia de usuario fluida',
  },
  {
    icon: <PenSquare className="h-10 w-10 text-primary" />,
    title: 'Creación de Contenido',
    description: 'Contenido creativo y de calidad que impulsa tu negocio en el mundo digital',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl font-title">Mis Servicios</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
           Aprovecho una amplia gama de habilidades para ofrecer resultados excepcionales en distintos campos creativos.
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
