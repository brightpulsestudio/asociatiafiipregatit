(function () {
  const GA_ID = "G-096NM6VP9W";
  const COOKIE_NAME = "afp_cookie_consent";
  const COOKIE_DAYS = 180;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return "";
  }

  function setCookie(name, value, days) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    document.cookie =
      `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  }

  function deleteCookie(name) {
    document.cookie =
      `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; Secure`;
  }

  function loadGoogleAnalytics() {
    if (window.__afpAnalyticsLoaded) return;

    window.__afpAnalyticsLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    script.onload = function () {
      window.dataLayer = window.dataLayer || [];

      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      gtag("js", new Date());

      gtag("config", GA_ID, {
        anonymize_ip: true
      });
    };

    document.head.appendChild(script);
  }

  function removeBanner() {
    const banner = document.getElementById("afpCookieBanner");

    if (banner) {
      banner.remove();
    }
  }

  function showBanner() {
    if (document.getElementById("afpCookieBanner")) return;

    const banner = document.createElement("div");

    banner.id = "afpCookieBanner";

    banner.innerHTML = `
      <div class="afp-cookie-card" role="dialog" aria-modal="false" aria-labelledby="afpCookieTitle">
        <div class="afp-cookie-icon">
          <i class="ti ti-cookie"></i>
        </div>

        <div class="afp-cookie-content">
          <h2 id="afpCookieTitle">Folosim cookie-uri analitice</h2>

          <p>
            Folosim Google Analytics pentru a înțelege, la nivel statistic,
            cum este utilizat site-ul nostru. Cookie-urile analitice ne ajută
            să vedem ce pagini sunt vizitate și cum ajung oamenii la noi.
          </p>

          <p>
            Poți accepta sau refuza cookie-urile analitice.
            Refuzul nu afectează accesul la site sau la formularul de înscriere.
          </p>

          <a href="/cookies/" class="afp-cookie-link">
            Citește Politica de cookies
          </a>
        </div>

        <div class="afp-cookie-actions">
          <button type="button" class="afp-cookie-refuse" id="afpCookieRefuse">
            Refuz
          </button>

          <button type="button" class="afp-cookie-accept" id="afpCookieAccept">
            Accept analitice
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById("afpCookieAccept").addEventListener("click", function () {
      setCookie(COOKIE_NAME, "accepted", COOKIE_DAYS);
      loadGoogleAnalytics();
      removeBanner();
    });

    document.getElementById("afpCookieRefuse").addEventListener("click", function () {
      setCookie(COOKIE_NAME, "refused", COOKIE_DAYS);
      removeBanner();
    });
  }

  function addPreferencesButton() {
    if (document.getElementById("afpCookiePreferences")) return;

    const button = document.createElement("button");

    button.id = "afpCookiePreferences";
    button.type = "button";
    button.setAttribute("aria-label", "Preferințe cookie");

    button.innerHTML = `
      <i class="ti ti-cookie"></i>
      <span>Cookie-uri</span>
    `;

    button.addEventListener("click", function () {
      deleteCookie(COOKIE_NAME);
      showBanner();
    });

    document.body.appendChild(button);
  }

  function injectStyles() {
    const style = document.createElement("style");

    style.textContent = `
      #afpCookieBanner{
        position:fixed;
        left:18px;
        right:18px;
        bottom:18px;
        z-index:9999;
        display:flex;
        justify-content:center;
        pointer-events:none;
      }

      .afp-cookie-card{
        width:min(920px,100%);
        display:grid;
        grid-template-columns:auto 1fr auto;
        gap:18px;
        align-items:center;
        background:#ffffff;
        border:1px solid #e6e0d2;
        border-left:5px solid #ff5502;
        box-shadow:0 18px 54px rgba(0,0,0,.22);
        border-radius:14px;
        padding:18px 20px;
        pointer-events:auto;
      }

      .afp-cookie-icon{
        width:46px;
        height:46px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex:0 0 auto;
        background:#f4efe4;
        color:#ff5502;
        border-radius:50%;
        font-size:22px;
      }

      .afp-cookie-content h2{
        margin:0 0 5px;
        color:#1b340c;
        font-family:'Fraunces',Georgia,serif;
        font-size:20px;
        line-height:1.2;
      }

      .afp-cookie-content p{
        margin:0 0 6px;
        color:#4c5440;
        font-size:12.5px;
        line-height:1.55;
      }

      .afp-cookie-link{
        display:inline-block;
        margin-top:2px;
        color:#ff5502;
        font-size:12px;
        font-weight:700;
        text-decoration:none;
      }

      .afp-cookie-link:hover{
        text-decoration:underline;
      }

      .afp-cookie-actions{
        display:flex;
        gap:9px;
        flex-wrap:wrap;
        justify-content:flex-end;
      }

      .afp-cookie-actions button{
        border-radius:6px;
        padding:10px 14px;
        font-family:inherit;
        font-size:12.5px;
        font-weight:700;
        cursor:pointer;
        transition:.2s;
      }

      .afp-cookie-refuse{
        background:#fff;
        color:#1b340c;
        border:1px solid #cdd6bd;
      }

      .afp-cookie-refuse:hover{
        border-color:#ff5502;
        color:#ff5502;
      }

      .afp-cookie-accept{
        background:#ff5502;
        color:#fff;
        border:1px solid #ff5502;
      }

      .afp-cookie-accept:hover{
        background:#e64d02;
        border-color:#e64d02;
      }

      #afpCookiePreferences{
        position:fixed;
        right:16px;
        bottom:16px;
        z-index:9998;
        display:flex;
        align-items:center;
        gap:7px;
        background:#1b340c;
        color:#fff;
        border:1px solid rgba(255,255,255,.2);
        border-radius:999px;
        padding:9px 13px;
        font-family:inherit;
        font-size:12px;
        font-weight:700;
        box-shadow:0 8px 20px rgba(0,0,0,.18);
        cursor:pointer;
      }

      #afpCookiePreferences:hover{
        background:#10380e;
      }

      #afpCookiePreferences i{
        color:#ff7a1f;
        font-size:16px;
      }

      @media(max-width:760px){
        #afpCookieBanner{
          left:12px;
          right:12px;
          bottom:12px;
        }

        .afp-cookie-card{
          display:block;
          padding:18px;
        }

        .afp-cookie-icon{
          margin-bottom:12px;
        }

        .afp-cookie-actions{
          justify-content:stretch;
          margin-top:16px;
        }

        .afp-cookie-actions button{
          flex:1;
        }

        #afpCookiePreferences{
          right:12px;
          bottom:12px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function init() {
    injectStyles();

    const consent = getCookie(COOKIE_NAME);

    if (consent === "accepted") {
      loadGoogleAnalytics();
    }

    if (!consent) {
      showBanner();
    }

    addPreferencesButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
