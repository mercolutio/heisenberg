/**
 * Heisenberg Energiesysteme – Cookie Consent Banner
 * DSGVO-konform: Opt-in, kein Pre-Ticking, localStorage-Speicherung
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'hes_cookie_consent';
  const VERSION     = '1';

  /* ── Gespeicherte Einwilligung lesen ── */
  function getConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (obj.version !== VERSION) return null;
      return obj;
    } catch { return null; }
  }

  /* ── Einwilligung speichern ── */
  function saveConsent(categories) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: VERSION,
      date: new Date().toISOString(),
      categories
    }));
  }

  /* ── Google Fonts dynamisch laden (nur bei Zustimmung) ── */
  function loadGoogleFonts() {
    if (document.getElementById('hes-gfonts')) return;
    const link = document.createElement('link');
    link.id   = 'hes-gfonts';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }

  /* ── Dienste aktivieren ── */
  function applyConsent(categories) {
    if (categories.extern) loadGoogleFonts();
  }

  /* ── Banner entfernen ── */
  function removeBanner() {
    const el = document.getElementById('hes-cookie-banner');
    if (el) el.remove();
    const overlay = document.getElementById('hes-cookie-overlay');
    if (overlay) overlay.remove();
  }

  /* ── Alle akzeptieren ── */
  function acceptAll() {
    const c = { necessary: true, extern: true };
    saveConsent(c);
    applyConsent(c);
    removeBanner();
  }

  /* ── Nur notwendige ── */
  function acceptNecessary() {
    const c = { necessary: true, extern: false };
    saveConsent(c);
    applyConsent(c);
    removeBanner();
  }

  /* ── Auswahl speichern ── */
  function saveSelection() {
    const externCheck = document.getElementById('hes-cat-extern');
    const c = {
      necessary: true,
      extern: externCheck ? externCheck.checked : false
    };
    saveConsent(c);
    applyConsent(c);
    removeBanner();
  }

  /* ── Details-Toggle ── */
  function toggleDetails() {
    const details = document.getElementById('hes-cookie-details');
    const btn     = document.getElementById('hes-details-btn');
    if (!details) return;
    const open = details.style.display === 'block';
    details.style.display = open ? 'none' : 'block';
    btn.textContent = open ? 'Einstellungen anzeigen ▾' : 'Einstellungen schließen ▴';
  }

  /* ── Banner HTML ── */
  function renderBanner() {
    const css = `
      #hes-cookie-overlay {
        position: fixed; inset: 0;
        background: rgba(15,20,30,0.55);
        z-index: 99998;
        backdrop-filter: blur(2px);
      }
      #hes-cookie-banner {
        position: fixed;
        bottom: 24px; left: 50%; transform: translateX(-50%);
        width: min(680px, calc(100vw - 32px));
        background: #1a2332;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 28px 28px 24px;
        z-index: 99999;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 14px;
        color: rgba(255,255,255,0.85);
        box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        line-height: 1.55;
      }
      #hes-cookie-banner * { box-sizing: border-box; }
      .hes-cb-head {
        display: flex; align-items: flex-start;
        gap: 12px; margin-bottom: 14px;
      }
      .hes-cb-icon {
        flex-shrink: 0;
        width: 36px; height: 36px;
        background: rgba(249,115,22,0.15);
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
      }
      .hes-cb-title {
        font-size: 16px; font-weight: 700;
        color: #fff; margin-bottom: 4px;
      }
      .hes-cb-sub {
        font-size: 13px; color: rgba(255,255,255,0.5);
      }
      .hes-cb-text {
        font-size: 13px; color: rgba(255,255,255,0.6);
        margin-bottom: 18px; line-height: 1.65;
      }
      .hes-cb-text a {
        color: #f97316; text-decoration: underline;
      }
      .hes-cb-actions {
        display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px;
      }
      .hes-btn {
        flex: 1; min-width: 120px;
        padding: 11px 18px;
        border-radius: 10px;
        font-family: inherit; font-size: 13px; font-weight: 600;
        cursor: pointer; border: none; transition: all 0.18s;
        text-align: center;
      }
      .hes-btn-primary {
        background: #f97316; color: #fff;
      }
      .hes-btn-primary:hover { background: #ea6c10; }
      .hes-btn-secondary {
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.15);
      }
      .hes-btn-secondary:hover { background: rgba(255,255,255,0.13); }
      .hes-btn-ghost {
        background: transparent;
        color: rgba(255,255,255,0.45);
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 12px;
      }
      .hes-btn-ghost:hover { color: rgba(255,255,255,0.7); }
      #hes-details-btn {
        background: none; border: none;
        color: rgba(255,255,255,0.4);
        font-family: inherit; font-size: 12px;
        cursor: pointer; padding: 0; margin-bottom: 14px;
        text-decoration: underline;
      }
      #hes-details-btn:hover { color: #f97316; }
      #hes-cookie-details { display: none; margin-bottom: 18px; }
      .hes-cat {
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        padding: 14px 16px;
        margin-bottom: 8px;
      }
      .hes-cat-head {
        display: flex; align-items: center;
        justify-content: space-between; gap: 12px;
        margin-bottom: 6px;
      }
      .hes-cat-name {
        font-size: 13px; font-weight: 600; color: #fff;
      }
      .hes-cat-desc {
        font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.5;
      }
      .hes-badge-required {
        font-size: 10px; font-weight: 700; letter-spacing: 0.3px;
        background: rgba(34,197,94,0.15); color: #86efac;
        border: 1px solid rgba(34,197,94,0.25);
        padding: 2px 8px; border-radius: 999px; white-space: nowrap;
      }
      /* Toggle switch */
      .hes-toggle { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
      .hes-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
      .hes-toggle-slider {
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.15);
        border-radius: 999px; cursor: pointer;
        transition: background 0.2s;
      }
      .hes-toggle-slider::before {
        content: '';
        position: absolute;
        width: 16px; height: 16px;
        left: 3px; top: 3px;
        background: #fff; border-radius: 50%;
        transition: transform 0.2s;
      }
      .hes-toggle input:checked + .hes-toggle-slider { background: #f97316; }
      .hes-toggle input:checked + .hes-toggle-slider::before { transform: translateX(18px); }
      .hes-toggle input:disabled + .hes-toggle-slider { opacity: 0.5; cursor: not-allowed; }
      .hes-cb-footer {
        font-size: 11px; color: rgba(255,255,255,0.3);
        text-align: center; margin-top: 4px;
      }
      .hes-cb-footer a { color: rgba(255,255,255,0.4); text-decoration: underline; }
      .hes-cb-footer a:hover { color: #f97316; }
      @media (max-width: 480px) {
        #hes-cookie-banner { padding: 22px 18px 18px; bottom: 12px; }
        .hes-cb-actions { flex-direction: column; }
        .hes-btn { flex: none; width: 100%; }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const overlay = document.createElement('div');
    overlay.id = 'hes-cookie-overlay';
    document.body.appendChild(overlay);

    const banner = document.createElement('div');
    banner.id = 'hes-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="hes-cb-head">
        <div class="hes-cb-icon">🍪</div>
        <div>
          <div class="hes-cb-title">Cookie-Einstellungen</div>
          <div class="hes-cb-sub">Heisenberg Energiesysteme</div>
        </div>
      </div>
      <p class="hes-cb-text">
        Wir verwenden Cookies und externe Dienste, um Ihnen die bestmögliche Nutzungserfahrung zu bieten.
        Notwendige Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.
        Externe Dienste (z.&nbsp;B. Google Fonts) werden nur nach Ihrer Zustimmung geladen.
        Weitere Informationen finden Sie in unserer
        <a href="/datenschutz.html">Datenschutzerklärung</a>.
      </p>

      <div class="hes-cb-actions">
        <button class="hes-btn hes-btn-primary" id="hes-accept-all">Alle akzeptieren</button>
        <button class="hes-btn hes-btn-secondary" id="hes-accept-necessary">Nur notwendige</button>
        <button class="hes-btn hes-btn-ghost" id="hes-save-selection" style="display:none">Auswahl speichern</button>
      </div>

      <button id="hes-details-btn">Einstellungen anzeigen ▾</button>

      <div id="hes-cookie-details">
        <div class="hes-cat">
          <div class="hes-cat-head">
            <span class="hes-cat-name">Notwendige Cookies</span>
            <span class="hes-badge-required">Immer aktiv</span>
          </div>
          <p class="hes-cat-desc">Diese Cookies sind für die grundlegende Funktionsfähigkeit der Website erforderlich und können nicht deaktiviert werden. Sie speichern keine persönlich identifizierbaren Informationen.</p>
        </div>
        <div class="hes-cat">
          <div class="hes-cat-head">
            <span class="hes-cat-name">Externe Dienste (Google Fonts)</span>
            <label class="hes-toggle">
              <input type="checkbox" id="hes-cat-extern" />
              <span class="hes-toggle-slider"></span>
            </label>
          </div>
          <p class="hes-cat-desc">Google Fonts lädt Schriftarten von Google-Servern. Dabei wird Ihre IP-Adresse an Google übermittelt. Ohne Zustimmung wird eine System-Schriftart verwendet.</p>
        </div>
      </div>

      <div class="hes-cb-footer">
        <a href="/impressum.html">Impressum</a> &nbsp;·&nbsp;
        <a href="/datenschutz.html">Datenschutz</a>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('hes-accept-all').addEventListener('click', acceptAll);
    document.getElementById('hes-accept-necessary').addEventListener('click', acceptNecessary);
    document.getElementById('hes-details-btn').addEventListener('click', function () {
      toggleDetails();
      document.getElementById('hes-save-selection').style.display = 'inline-block';
      document.getElementById('hes-accept-necessary').style.display = 'none';
    });
    document.getElementById('hes-save-selection').addEventListener('click', saveSelection);
  }

  /* ── Init ── */
  function init() {
    const consent = getConsent();
    if (consent) {
      // Einwilligung bereits vorhanden – Dienste direkt aktivieren
      applyConsent(consent.categories);
      return;
    }
    // Kein Consent → Banner zeigen
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderBanner);
    } else {
      renderBanner();
    }
  }

  /* ── Einwilligung nachträglich ändern (aufrufbar per Link) ── */
  window.hesOpenCookieSettings = function () {
    const existing = document.getElementById('hes-cookie-banner');
    if (existing) return;
    renderBanner();
  };

  init();
})();
