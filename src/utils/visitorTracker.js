const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

export async function trackVisitor() {
  try {
    if (!DISCORD_WEBHOOK_URL) return;

    // Avoid spamming on every refresh in the same session
    if (sessionStorage.getItem("tracked_session")) {
      return;
    }
    sessionStorage.setItem("tracked_session", "true");

    // Fetch IP and location info from ipwho.is (free, HTTPS, CORS-friendly)
    let ipData = null;
    try {
      const res = await fetch("https://ipwho.is/");
      if (res.ok) {
        ipData = await res.json();
      }
    } catch {
      // Fallback to basic ipify if ipwho.is is blocked
      try {
        const fallbackRes = await fetch("https://api.ipify.org?format=json");
        const fallbackData = await fallbackRes.json();
        ipData = { ip: fallbackData.ip, country: "Unknown", city: "Unknown" };
      } catch {
        ipData = { ip: "Unknown" };
      }
    }

    if (!ipData) return;

    // Detect browser & device info
    const ua = navigator.userAgent;
    let device = "Desktop / PC";
    if (/android/i.test(ua)) device = "Android Phone/Tablet";
    else if (/iphone|ipad|ipod/i.test(ua)) device = "iPhone / iPad";
    else if (/macintosh|mac os x/i.test(ua)) device = "Mac";
    else if (/windows/i.test(ua)) device = "Windows PC";
    else if (/linux/i.test(ua)) device = "Linux PC";

    const referrer = document.referrer ? document.referrer : "Direct / Bookmarked";
    const currentPage = window.location.href;
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const countryEmoji = ipData.country_code
      ? String.fromCodePoint(
          ...[...ipData.country_code.toUpperCase()].map(
            (c) => 127397 + c.charCodeAt(0)
          )
        )
      : "🌍";

    const locationText =
      ipData.city && ipData.country
        ? `${ipData.city}, ${ipData.country} ${countryEmoji}`
        : "Unknown Location";

    const ispText =
      ipData.connection?.isp || ipData.isp || ipData.org || "Unknown ISP";

    const hasCoords = ipData.latitude && ipData.longitude;
    const mapsUrl = hasCoords
      ? `https://www.google.com/maps?q=${ipData.latitude},${ipData.longitude}`
      : null;

    // Discord Rich Embed
    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      embeds: [
        {
          title: isLocalhost
            ? "🧪 Test Visit (Localhost)"
            : "🚨 New Visitor on Your Portfolio!",
          color: isLocalhost ? 16776960 : 3447003, // Yellow for test, Blue for live
          fields: [
            {
              name: "🌐 IP Address",
              value: `\`${ipData.ip || "Unknown"}\``,
              inline: true,
            },
            {
              name: "📍 Location",
              value: locationText,
              inline: true,
            },
            {
              name: "🗺️ Google Maps",
              value: mapsUrl ? `[📍 فتح فالخريطة](${mapsUrl})` : "N/A",
              inline: true,
            },
            {
              name: "🧭 الإحداثيات",
              value: hasCoords
                ? `\`${ipData.latitude.toFixed(4)}, ${ipData.longitude.toFixed(4)}\``
                : "N/A",
              inline: true,
            },
            {
              name: "🏢 Network / ISP",
              value: ispText,
              inline: true,
            },
            {
              name: "📱 Device",
              value: device,
              inline: true,
            },
            {
              name: "🔗 Referrer",
              value: referrer,
              inline: true,
            },
            {
              name: "📄 Page",
              value: `[Link](${currentPage})`,
              inline: true,
            },
          ],
          footer: {
            text: "Ayoub Khalal Portfolio • Live IP & Maps Tracker",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Fail silently so it never interrupts the portfolio UI
    console.debug("Tracker:", error);
  }
}
