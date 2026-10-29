import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";

const MENU_ITEMS = [...NAV].reverse();

export function ScrollNavigation() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setVisible(false);
    const introduction = document.querySelector(
      pathname === "/" ? "[data-navigation-intro]" : "header",
    );
    if (!introduction) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      const pastIntroduction = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      setVisible(pastIntroduction);
      if (!pastIntroduction) setOpen(false);
    });
    observer.observe(introduction);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <Dialog.Root open={open && visible} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`scroll-menu-trigger ${visible ? "is-visible" : ""}`}
          aria-label="Open circular navigation"
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
        >
          <svg viewBox="0 0 120 120" aria-hidden="true" className="scroll-menu-bullseye">
            <circle cx="60" cy="60" r="50" />
            <circle cx="60" cy="60" r="40" />
            <circle cx="60" cy="60" r="30" />
            <circle cx="60" cy="60" r="20" />
            <circle cx="60" cy="60" r="10" />
          </svg>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="scroll-menu-overlay" />
        <Dialog.Content className="scroll-menu-panel" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Embeddly navigation</Dialog.Title>
          <nav aria-label="Circular navigation" className="scroll-menu-rings">
            {MENU_ITEMS.map((item, index) => (
              <Button asChild variant="ghost" key={item.to} className="scroll-menu-ring" data-ring={NAV.length - index}>
                <Link to={item.to} onClick={() => setOpen(false)} aria-label={item.label} aria-current={pathname === item.to ? "page" : undefined}>
                  <span className="scroll-menu-label">{item.to === "/program" ? "Program" : item.to === "/experience" ? "Experience" : item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
          <Dialog.Close asChild>
            <Button variant="default" size="icon" className="scroll-menu-close" aria-label="Close circular navigation">
              <X aria-hidden="true" />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}