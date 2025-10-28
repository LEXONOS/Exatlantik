"use client";
import { useEffect, useState } from "react";

export default function CookieBanner(){
  const [shown, setShown] = useState(false);
  useEffect(()=>{
    const c = localStorage.getItem("cookie-ok");
    if(!c) setShown(true);
  }, []);

  if(!shown) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-50 px-4">
      <div className="card max-w-3xl w-full p-4 bg-white/95">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <p className="text-sm text-slate-700">
            Nous limitons les cookies au strict nécessaire (mesure d’audience anonyme). En continuant, vous acceptez notre
            <a className="underline ml-1" href="/a-propos-legal#cookies">politique cookies</a>.
          </p>
          <div className="md:ml-auto flex gap-2">
            <button className="btn btn-ghost" onClick={()=>{ localStorage.setItem("cookie-ok","no"); setShown(false); }}>Refuser</button>
            <button className="btn btn-primary" onClick={()=>{ localStorage.setItem("cookie-ok","yes"); setShown(false); }}>Accepter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
