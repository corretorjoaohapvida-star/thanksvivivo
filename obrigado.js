/* Shared guidance; never infers purchase or payment approval from this URL. */
(() => {
  'use strict';
  const config = window.UPSELL_CONFIG || {};
  if (typeof config.ownerName === 'string' && config.ownerName.trim()) {
    const el = document.querySelector('#ty-owner'); el.textContent = 'Pubblicato da ' + config.ownerName.trim(); el.hidden = false;
  }
  if (typeof config.supportEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.supportEmail)) {
    const el = document.querySelector('#ty-direct-support'); el.href = 'mailto:' + config.supportEmail; el.hidden = false;
  }
  const nav = document.querySelector('#ty-legal-links');
  (Array.isArray(config.legalLinks) ? config.legalLinks : []).forEach(link => {
    try { const u = new URL(link.url); if (!['https:', 'http:'].includes(u.protocol) || typeof link.label !== 'string' || !link.label.trim()) return;
      const a = document.createElement('a'); a.href = u.href; a.textContent = link.label.trim(); nav.append(a);
    } catch { /* Invalid or absent URLs stay out of the public page. */ }
  });
  nav.hidden = !nav.children.length;
})();
