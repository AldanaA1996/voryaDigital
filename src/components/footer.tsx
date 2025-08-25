
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          © {new Date().getFullYear()} CommitPath. All rights reserved.
        </p>
        <div className="flex items-center space-x-2">
          
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/aldana-albani-7409b4336/" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.instagram.com/voryadigi/" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
