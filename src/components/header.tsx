
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-lg font-headline">Nexus Portfolio</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="#services">Services</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#portfolio">Portfolio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
        <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
          <Link href="#contact">Hire Me</Link>
        </Button>
        {/* Add mobile menu trigger here if needed in future */}
      </div>
    </header>
  );
}
