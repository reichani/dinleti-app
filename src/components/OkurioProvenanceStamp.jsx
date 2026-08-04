import React from "react";

const palette = {
  ink: "#F2ECDF",
  muted: "#B7BECC",
  accent: "#E8A33D",
  border: "rgba(232,163,61,0.38)",
  surface: "rgba(232,163,61,0.08)",
};

export default function OkurioProvenanceStamp({ stamp, compact = false }) {
  if (!stamp) return null;

  if (compact) {
    return (
      <span
        data-okurio-provenance-stamp
        data-compact="true"
        aria-label={`${stamp.mark}: ${stamp.shortDisclosure}`}
        style={{
          display: "inline-flex",
          maxWidth: "100%",
          marginTop: 6,
          border: `1px solid ${palette.border}`,
          borderRadius: 999,
          padding: "3px 7px",
          color: palette.accent,
          background: palette.surface,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: "0.05em",
          lineHeight: 1.2,
        }}
      >
        {stamp.mark}
      </span>
    );
  }

  return (
    <section
      data-okurio-provenance-stamp
      aria-label="Okurio kaynak ve üretim bilgisi"
      style={{
        marginTop: 14,
        border: `1px solid ${palette.border}`,
        borderRadius: 14,
        padding: 14,
        color: palette.ink,
        background: palette.surface,
      }}
    >
      <div style={{ color: palette.accent, fontWeight: 850, letterSpacing: "0.06em", fontSize: 12 }}>
        {stamp.mark}
      </div>
      <p style={{ margin: "8px 0 0", color: palette.ink, fontSize: 12, lineHeight: 1.55 }}>
        {stamp.disclosure}
      </p>
      <p style={{ margin: "6px 0 0", color: palette.muted, fontSize: 11, lineHeight: 1.5 }}>
        {stamp.reviewNotice}
      </p>
      {stamp.primarySources?.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <strong style={{ fontSize: 11 }}>Ana kaynak referansları</strong>
          <ul style={{ margin: "6px 0 0", paddingInlineStart: 18, fontSize: 11, lineHeight: 1.6 }}>
            {stamp.primarySources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" style={{ color: palette.accent }}>
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
