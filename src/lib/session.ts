import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type SessionListener = (event: AuthChangeEvent, session: Session | null) => void;

const listeners = new Set<SessionListener>();
let lastEvent: AuthChangeEvent = "INITIAL_SESSION";
let lastSession: Session | null = null;
let started = false;

function emit() {
  for (const listener of [...listeners]) listener(lastEvent, lastSession);
}

/**
 * Registers the app's single Supabase auth subscription. Safe to call from
 * several places: only the first call wires the listener.
 */
export function startSessionSync() {
  if (started || typeof window === "undefined") return;
  started = true;

  void supabase.auth.getSession().then(({ data }) => {
    lastEvent = "INITIAL_SESSION";
    lastSession = data.session;
    emit();
  });

  supabase.auth.onAuthStateChange((event, session) => {
    lastEvent = event;
    lastSession = session;
    emit();
  });
}

export function subscribeSession(listener: SessionListener) {
  listeners.add(listener);
  listener(lastEvent, lastSession);
  return () => {
    listeners.delete(listener);
  };
}

/** The signed-in user, kept fresh by the single shared auth subscription. */
export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    startSessionSync();
    return subscribeSession((_event, session) => setUser(session?.user ?? null));
  }, []);

  return user;
}
