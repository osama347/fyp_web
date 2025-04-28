import React from "react";
import { Mail, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Virtual Mirror. All rights reserved.
          </div>
          <nav className="flex gap-6">
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="/docs"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Documentation
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
