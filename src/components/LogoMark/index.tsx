import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

/**
 * O SVG da logo usa backdrop-filter em foreignObject, que o WebKit (Safari em
 * qualquer plataforma e todos os navegadores no iOS) renderiza borrado. Nesses
 * casos servimos um PNG de alta resolução, idêntico ao SVG. Nos demais
 * (Chrome/Firefox) mantemos o SVG original intocado.
 */
function isWebKit(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  return isSafari || isIOS;
}

export function LogoMark({ className }: { className?: string }) {
  const [webkit, setWebkit] = useState(false);
  useEffect(() => setWebkit(isWebKit()), []);

  if (webkit) {
    return <img className={className} src="/logo.png" alt="Oubble" />;
  }
  return <Logo className={className} />;
}
