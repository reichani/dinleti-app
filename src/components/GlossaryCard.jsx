import React, { useEffect, useRef } from "react";
import { Volume2, X } from "lucide-react";

/**
 * Accessible, single-word glossary card.
 *
 * The parent owns the selected word so opening and closing the card never
 * changes reading position. Pronunciation is opt-in and isolated from story
 * TTS by the parent callback.
 */
export default function GlossaryCard({ entry, onClose, onPronounce }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!entry) return undefined;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <aside
      aria-label={`${entry.word} kelime açıklaması`}
      aria-live="polite"
      role="dialog"
      style={{
        width: "min(92vw, 360px)",
        border: "1px solid currentColor",
        borderRadius: 16,
        padding: 16,
        background: "var(--okurio-card-bg, #fffdf7)",
        color: "var(--okurio-card-text, #1f2933)",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.14)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.72 }}>
            HEDEF KELİME
          </div>
          <h3 style={{ margin: "4px 0 8px", fontSize: 22 }}>{entry.word}</h3>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Kelime açıklamasını kapat"
          onClick={onClose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 44,
            minHeight: 44,
            borderRadius: 12,
            border: "1px solid currentColor",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>

      <p style={{ margin: "0 0 14px", lineHeight: 1.55 }}>{entry.definition}</p>

      {onPronounce ? (
        <button
          type="button"
          onClick={() => onPronounce(entry.word)}
          aria-label={`${entry.word} kelimesini seslendir`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            minHeight: 44,
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid currentColor",
            background: "transparent",
            color: "inherit",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Volume2 aria-hidden="true" size={18} />
          Kelimeyi dinle
        </button>
      ) : null}
    </aside>
  );
}
