import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Vorya Digital Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-lg font-headline">Vorya Digital</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="#services">Servicios</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#portfolio">Portfolio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">Contacto</Link>
          </Button>
        </nav>
        <Button className="hidden md:flex bg-accent hover:bg-green-600 text-white" asChild>
          <Link href="https://wa.me/2342414208" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Hire Me
          </Link>
        </Button>
        {/* Add mobile menu trigger here if needed in future */}
      </div>
    </header>
  );
}