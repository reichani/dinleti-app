import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./mobile-reading.css";
import "./mobile-settings-hotfix.css";
import "./reading-position-hotfix.css";
import { installReadingMobileFixes } from "./reading-mobile-fixes.js";
import { installDocumentImportAdapter } from "./document-import-adapter.js";

// Claude artifact ortamindaki window.storage API'sini localStorage ile kopruler.
// Ayni App.jsx dosyasi hem artifact icinde hem Cloudflare Pages'te calisir.
if (!window.storage) {
  window.storage = {
    async get(key) {
      const v = localStorage.getItem("dinleti:" + key);
      if (v === null) throw new Error("key not found");
      return { key, value: v };
    },
    async set(key, value) {
      localStorage.setItem("dinleti:" + key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem("dinleti:" + key);
      return { key, deleted: true };
    },
    async list(prefix = "") {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith("dinleti:" + prefix)) keys.push(k.slice(8));
      }
      return { keys };
    },
  };
}

document.body.style.margin = "0";
document.body.style.background = "#14181F";
createRoot(document.getElementById("root")).render(<App />);
installReadingMobileFixes();
window.requestAnimationFrame(() => installDocumentImportAdapter());
