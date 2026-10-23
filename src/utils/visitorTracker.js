const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

// Helper to get cached or fresh IP info
async function getVisitorInfo() {
  let ipData = null;
  try {
    const res = await fetch("https://ipwho.is/");
    if (res.ok) {
      ipData = await res.json();
    }
  } catch {
    try {
      const fallbackRes = await fetch("https://api.ipify.org?format=json");
      const fallbackData = await fallbackRes.json();
      ipData = { ip: fallbackData.ip, country: "Unknown", city: "Unknown" };
    } catch {
      ipData = { ip: "Unknown" };
    }
  }
  return ipData || { ip: "Unknown" };
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android Phone/Tablet";
  if (/iphone|ipad|ipod/i.test(ua)) return "iPhone / iPad";
  if (/macintosh|mac os x/i.test(ua)) return "Mac";
  if (/windows/i.test(ua)) return "Windows PC";
  if (/linux/i.test(ua)) return "Linux PC";
  return "Desktop / PC";
}

// 1. Automatic visitor tracker (once per session)
export async function trackVisitor() {
  try {
    if (!DISCORD_WEBHOOK_URL) return;

    if (sessionStorage.getItem("tracked_session")) {
      return;
    }
    sessionStorage.setItem("tracked_session", "true");

    const ipData = await getVisitorInfo();
    const device = getDeviceInfo();
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

    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      embeds: [
        {
          title: isLocalhost
            ? "🧪 Test Visit (Localhost)"
            : "🚨 New Visitor on Your Portfolio!",
          color: isLocalhost ? 16776960 : 3447003,
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
    console.debug("Tracker:", error);
  }
}

// 2. Track when someone downloads the CV
export async function trackCvDownload(version = "EN") {
  try {
    if (!DISCORD_WEBHOOK_URL) return;

    const ipData = await getVisitorInfo();
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

    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      embeds: [
        {
          title: "📄 CV Download Alert!",
          description: `شخص قام بتحميل السيرة الذاتية النسخة: **${version}**`,
          color: 65280,
          fields: [
            {
              name: "📑 النسخة (Version)",
              value: `**${version}**`,
              inline: true,
            },
            {
              name: "🌐 IP Address",
              value: `\`${ipData.ip || "Unknown"}\``,
              inline: true,
            },
            {
              name: "📍 الموقع (Location)",
              value: locationText,
              inline: true,
            },
          ],
          footer: {
            text: "Ayoub Khalal Portfolio • CV Tracker",
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
    console.debug("CV Tracker:", error);
  }
}

// 3. Send contact form message directly to Discord
export async function sendContactMessage({ name, email, message }) {
  try {
    if (!DISCORD_WEBHOOK_URL) return false;

    const ipData = await getVisitorInfo();
    const locationText =
      ipData.city && ipData.country
        ? `${ipData.city}, ${ipData.country}`
        : "Unknown";

    const payload = {
      username: "Portfolio Contact Form",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
      embeds: [
        {
          title: "✉️ رسالة جديدة من الموقع (Contact Form)!",
          color: 16744272,
          fields: [
            {
              name: "👤 الاسم (Name)",
              value: name || "Anonymous",
              inline: true,
            },
            {
              name: "📧 البريد الإلكتروني (Email)",
              value: email || "Not provided",
              inline: true,
            },
            {
              name: "📍 الموقع / IP",
              value: `${locationText} (\`${ipData.ip || "Unknown"}\`)`,
              inline: true,
            },
            {
              name: "💬 الرسالة (Message)",
              value: message || "No message content",
              inline: false,
            },
          ],
          footer: {
            text: "Ayoub Khalal Portfolio • Direct Message",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (error) {
    console.debug("Contact form error:", error);
    return false;
  }
}

// 4. Track Project Case Study views
export async function trackProjectView(projectTitle) {
  try {
    if (!DISCORD_WEBHOOK_URL) return;

    const ipData = await getVisitorInfo();
    const locationText =
      ipData.city && ipData.country
        ? `${ipData.city}, ${ipData.country}`
        : "Unknown";

    const payload = {
      username: "Portfolio Tracker",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      embeds: [
        {
          title: "🔍 Project Case Study Viewed!",
          description: `شخص كليكا يشوف تفاصيل مشروع: **${projectTitle}**`,
          color: 9442302, // Violet
          fields: [
            {
              name: "📊 المشروع (Project)",
              value: `**${projectTitle}**`,
              inline: true,
            },
            {
              name: "📍 الموقع / IP",
              value: `${locationText} (\`${ipData.ip || "Unknown"}\`)`,
              inline: true,
            },
          ],
          footer: {
            text: "Ayoub Khalal Portfolio • Project Analytics",
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
    console.debug("Project Tracker:", error);
  }
}

// 5. Track AI Assistant Questions
export async function trackAiQuestion(question, answerSnippet = "") {
  try {
    if (!DISCORD_WEBHOOK_URL) return;

    const ipData = await getVisitorInfo();
    const locationText =
      ipData.city && ipData.country
        ? `${ipData.city}, ${ipData.country}`
        : "Unknown";

    const payload = {
      username: "Portfolio AI Assistant",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
      embeds: [
        {
          title: "🤖 سؤال جديد لـ AI Assistant!",
          color: 39129, // Turquoise
          fields: [
            {
              name: "❓ السؤال (Question)",
              value: `"${question}"`,
              inline: false,
            },
            {
              name: "💡 مقتطف الجواب (Answer)",
              value: answerSnippet.slice(0, 200) + "...",
              inline: false,
            },
            {
              name: "📍 الموقع / IP",
              value: `${locationText} (\`${ipData.ip || "Unknown"}\`)`,
              inline: true,
            },
          ],
          footer: {
            text: "Ayoub Khalal Portfolio • AI Chatbot Log",
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
    console.debug("AI Tracker:", error);
  }
}
