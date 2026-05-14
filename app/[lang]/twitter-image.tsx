import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { hasLocale } from "./dictionaries";

export const alt = "Detondo Insurance and Reinsurance Brokerage";
export const size = { width: 1200, height: 628 };
export const contentType = "image/png";

const TEXT = {
  pt: {
    subtitle: "Corretora de Seguros e Resseguros",
    eyebrow: "Seguros, resseguros e gestao de risco",
    title: "Seguros e resseguros,\nfeitos para Angola",
    stats: [
      { value: "2017", label: "Ano de fundacao" },
      { value: "10+", label: "Seguradoras parceiras" },
      { value: "ANPG", label: "Certificacao P&G" },
    ],
  },
  en: {
    subtitle: "Insurance and Reinsurance Brokerage",
    eyebrow: "Insurance, reinsurance & risk management",
    title: "Insurance and reinsurance,\nmade for Angola",
    stats: [
      { value: "2017", label: "Year founded" },
      { value: "10+", label: "Partner insurers" },
      { value: "ANPG", label: "Oil & Gas certified" },
    ],
  },
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? (lang as "pt" | "en") : "pt";
  const t = TEXT[locale];

  const logoBytes = await readFile(
    join(process.cwd(), "public/logo-transparent.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 628,
          display: "flex",
          backgroundColor: "#171A35",
          position: "relative",
          overflow: "hidden",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #0c1025 0%, #171A35 45%, #0a1e40 100%)",
            display: "flex",
          }}
        />

        {/* Parallelogram accent — top right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -80,
            width: 440,
            height: 520,
            background:
              "linear-gradient(145deg, rgba(5,187,251,0.13) 0%, rgba(5,187,251,0.02) 100%)",
            transform: "skewX(-14deg)",
            display: "flex",
          }}
        />

        {/* Parallelogram accent — bottom right (smaller) */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: 240,
            width: 260,
            height: 220,
            background: "rgba(5,187,251,0.05)",
            transform: "skewX(-14deg)",
            display: "flex",
          }}
        />

        {/* Left azure accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 5,
            backgroundColor: "#05BBFB",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "58px 80px 58px 86px",
            width: "100%",
          }}
        >
          {/* Logo + brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 50,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt=""
              width={44}
              height={44}
              style={{ objectFit: "contain" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  color: "#FBFCFC",
                  fontSize: 23,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Detondo
              </span>
              <span
                style={{
                  color: "#05BBFB",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {t.subtitle}
              </span>
            </div>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#05BBFB",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#05BBFB",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {t.eyebrow}
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              color: "#FBFCFC",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              maxWidth: 820,
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              whiteSpace: "pre-line",
            }}
          >
            {t.title}
          </div>

          {/* Bottom row: stats + domain */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 44,
            }}
          >
            {/* Stats */}
            <div style={{ display: "flex", gap: 48 }}>
              {t.stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      color: "#05BBFB",
                      fontSize: 24,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      color: "rgba(251,252,252,0.5)",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      lineHeight: 1,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Domain */}
            <span
              style={{
                color: "rgba(251,252,252,0.35)",
                fontSize: 14,
                letterSpacing: "0.06em",
              }}
            >
              detondocorretora.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
