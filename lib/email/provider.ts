import "server-only";
import type { ContactMessage } from "./types";

export interface EmailProvider {
  readonly name: string;
  sendContactMessage(message: ContactMessage): Promise<void>;
}

// Email templates are in Portuguese — these are staff-facing notifications
// delivered to the brokerage inbox, not to the contact form submitter.
const SERVICE_LABELS_PT: Record<string, string> = {
  motor: "Seguro Automovel",
  health: "Seguro de Saude",
  life: "Seguro de Vida",
  travel: "Seguro de Viagem",
  corporate: "Seguro Empresarial",
  oilgas: "Petroleo e Gas",
  marine: "Maritimo / Carga",
  mining: "Mineracao e Recursos Minerais",
  reinsurance: "Resseguro",
  riskManagement: "Gestao de Risco",
  other: "Outro",
};

const PURPOSE_LABELS_PT: Record<string, string> = {
  quote: "Pedido de cotacao",
  consultant: "Falar com um consultor",
  claim: "Participar um sinistro",
  renewal: "Renovacao de apolice",
  info: "Pedido de informacao",
  partnership: "Oportunidade de parceria",
  support: "Apoio ao cliente",
};

const HEALTH_PLAN_LABELS_PT: Record<string, string> = {
  individual: "Individual",
  family: "Familiar",
  corporate: "Empresarial",
};

const OIL_GAS_SEGMENT_LABELS_PT: Record<string, string> = {
  upstream: "Upstream",
  midstream: "Midstream",
  downstream: "Downstream",
  marine: "Maritimo",
};

const MINING_COVERAGE_LABELS_PT: Record<string, string> = {
  operations: "Operacoes de mineracao",
  equipment: "Equipamentos mineiros",
  transport: "Transporte de minerios",
  liability: "Responsabilidade civil",
  operational: "Riscos operacionais",
};

const REINSURANCE_TYPE_LABELS_PT: Record<string, string> = {
  treaty: "Tratado",
  facultative: "Facultativo",
  consulting: "Consultoria",
  riskMgmt: "Gestao de risco",
};

export function renderContactText(message: ContactMessage): string {
  const lines: (string | null)[] = [
    `Nova mensagem de contacto (${message.locale.toUpperCase()})`,
    "=".repeat(50),
    "",
    `Nome:    ${message.name}`,
    `Email:   ${message.email}`,
    message.phone ? `Telefone: ${message.phone}` : null,
    message.serviceType
      ? `Servico:  ${SERVICE_LABELS_PT[message.serviceType] ?? message.serviceType}`
      : null,
    message.purpose
      ? `Finalidade: ${PURPOSE_LABELS_PT[message.purpose] ?? message.purpose}`
      : null,
  ];

  // Conditional detail fields
  if (message.motorBrand || message.motorModel || message.motorYear) {
    lines.push("", "Veiculo:");
    if (message.motorBrand) lines.push(`  Marca:  ${message.motorBrand}`);
    if (message.motorModel) lines.push(`  Modelo: ${message.motorModel}`);
    if (message.motorYear) lines.push(`  Ano:    ${message.motorYear}`);
  }
  if (message.healthPlan)
    lines.push(
      `Plano de saude: ${HEALTH_PLAN_LABELS_PT[message.healthPlan] ?? message.healthPlan}`,
    );
  if (message.oilGasSegment)
    lines.push(
      `Segmento Petroleo/Gas: ${OIL_GAS_SEGMENT_LABELS_PT[message.oilGasSegment] ?? message.oilGasSegment}`,
    );
  if (message.miningCoverages) {
    const labels = message.miningCoverages
      .split(",")
      .map((k) => MINING_COVERAGE_LABELS_PT[k.trim()] ?? k.trim())
      .join(", ");
    lines.push(`Coberturas mineracao: ${labels}`);
  }
  if (message.reinsuranceType)
    lines.push(
      `Tipo de resseguro: ${REINSURANCE_TYPE_LABELS_PT[message.reinsuranceType] ?? message.reinsuranceType}`,
    );
  if (message.otherDescription)
    lines.push("", "Descricao:", message.otherDescription);
  if (message.comments)
    lines.push("", "Observacoes:", message.comments);

  return lines.filter((l) => l !== null).join("\n");
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function detailRow(label: string, value: string | undefined): string {
  if (!value) return "";
  return `
            <tr>
              <td style="padding:6px 12px 6px 0;color:#7D808C;font-size:13px;white-space:nowrap;vertical-align:top;width:140px">${escapeHtml(label)}</td>
              <td style="padding:6px 0;color:#171A35;font-size:14px;vertical-align:top">${escapeHtml(value)}</td>
            </tr>`;
}

function sectionDivider(title: string): string {
  return `
          <tr>
            <td colspan="2" style="padding:20px 0 8px 0">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#05BBFB">${escapeHtml(title)}</div>
              <div style="height:1px;background:rgba(5,187,251,0.2);margin-top:6px"></div>
            </td>
          </tr>`;
}

export function renderContactHtml(message: ContactMessage): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com";
  const logoUrl = `${siteUrl}/logo-transparent.png`;

  // Build motor detail rows
  const hasMotor = message.motorBrand || message.motorModel || message.motorYear;
  const motorSection = hasMotor
    ? sectionDivider("Veiculo") +
      detailRow("Marca", message.motorBrand) +
      detailRow("Modelo", message.motorModel) +
      detailRow("Ano", message.motorYear)
    : "";

  // Health plan
  const healthSection = message.healthPlan
    ? sectionDivider("Plano de Saude") +
      detailRow(
        "Tipo de plano",
        HEALTH_PLAN_LABELS_PT[message.healthPlan] ?? message.healthPlan,
      )
    : "";

  // Oil & gas
  const oilGasSection = message.oilGasSegment
    ? sectionDivider("Petroleo e Gas") +
      detailRow(
        "Segmento",
        OIL_GAS_SEGMENT_LABELS_PT[message.oilGasSegment] ?? message.oilGasSegment,
      )
    : "";

  // Mining coverages — stored as comma-separated keys
  let miningSection = "";
  if (message.miningCoverages) {
    const coverageLabels = message.miningCoverages
      .split(",")
      .map((k) => MINING_COVERAGE_LABELS_PT[k.trim()] ?? k.trim())
      .filter(Boolean);
    if (coverageLabels.length) {
      miningSection =
        sectionDivider("Mineracao e Recursos Minerais") +
        coverageLabels
          .map(
            (label) => `
            <tr>
              <td colspan="2" style="padding:4px 0 4px 12px;color:#171A35;font-size:14px">
                <span style="color:#05BBFB;margin-right:6px">&#8250;</span>${escapeHtml(label)}
              </td>
            </tr>`,
          )
          .join("");
    }
  }

  // Reinsurance
  const reinsuranceSection = message.reinsuranceType
    ? sectionDivider("Resseguro") +
      detailRow(
        "Tipo",
        REINSURANCE_TYPE_LABELS_PT[message.reinsuranceType] ?? message.reinsuranceType,
      )
    : "";

  // Other / free-text description
  const otherSection = message.otherDescription
    ? `
          <tr><td colspan="2" style="padding:20px 0 8px 0">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#05BBFB">Descricao</div>
            <div style="height:1px;background:rgba(5,187,251,0.2);margin-top:6px"></div>
          </td></tr>
          <tr><td colspan="2" style="padding:6px 0 0 0;color:#171A35;font-size:14px;line-height:22px;white-space:pre-wrap">${escapeHtml(message.otherDescription)}</td></tr>`
    : "";

  // Comments
  const commentsSection = message.comments
    ? `
          <tr><td colspan="2" style="padding:20px 0 8px 0">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7D808C">Observacoes</div>
            <div style="height:1px;background:rgba(125,128,140,0.2);margin-top:6px"></div>
          </td></tr>
          <tr><td colspan="2" style="padding:6px 0 0 0;color:#171A35;font-size:14px;line-height:22px;white-space:pre-wrap">${escapeHtml(message.comments)}</td></tr>`
    : "";

  const hasAnyDetails =
    hasMotor ||
    message.healthPlan ||
    message.oilGasSegment ||
    message.miningCoverages ||
    message.reinsuranceType ||
    message.otherDescription;

  return `<!doctype html>
<html lang="pt">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#f2f5f8;padding:24px;color:#171A35;margin:0">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px;margin:0 auto">

      <!-- Header -->
      <tr>
        <td style="background:#171A35;padding:24px 28px;border-radius:16px 16px 0 0">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="vertical-align:middle">
                <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#05BBFB;font-weight:700">Detondo &middot; Novo pedido</div>
                <div style="font-size:22px;font-weight:700;color:#FBFCFC;margin-top:6px">${escapeHtml(message.name)}</div>
              </td>
              <td style="vertical-align:middle;text-align:right;width:52px;padding-left:16px">
                <img src="${logoUrl}" alt="Detondo" width="44" height="44" style="display:block;margin-left:auto;border-radius:8px" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:28px 28px 24px;border-left:1px solid rgba(125,128,140,0.15);border-right:1px solid rgba(125,128,140,0.15)">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">

            <!-- Contact details -->
            ${sectionDivider("Contacto")}
            <tr>
              <td style="padding:6px 12px 6px 0;color:#7D808C;font-size:13px;vertical-align:top;width:140px">Email</td>
              <td style="padding:6px 0;font-size:14px;vertical-align:top"><a href="mailto:${escapeHtml(message.email)}" style="color:#0399d1;text-decoration:none">${escapeHtml(message.email)}</a></td>
            </tr>
            ${detailRow("Telefone", message.phone)}
            ${detailRow("Idioma", message.locale.toUpperCase())}

            <!-- Service context -->
            ${message.serviceType || message.purpose ? sectionDivider("Pedido") : ""}
            ${message.serviceType ? detailRow("Servico", SERVICE_LABELS_PT[message.serviceType] ?? message.serviceType) : ""}
            ${message.purpose ? detailRow("Finalidade", PURPOSE_LABELS_PT[message.purpose] ?? message.purpose) : ""}

            <!-- Specific detail sections -->
            ${hasAnyDetails ? motorSection + healthSection + oilGasSection + miningSection + reinsuranceSection + otherSection : ""}

            <!-- Comments -->
            ${commentsSection}

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f2f5f8;padding:16px 28px;border-radius:0 0 16px 16px;border:1px solid rgba(125,128,140,0.15);border-top:none;text-align:center">
          <p style="margin:0;font-size:11px;color:#7D808C">Este email foi gerado automaticamente pelo formulario de contacto em <a href="${siteUrl}" style="color:#7D808C">${siteUrl.replace(/^https?:\/\//, "")}</a>. Nao responda directamente a este email.</p>
        </td>
      </tr>

    </table>
  </body>
</html>`;
}
