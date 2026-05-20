export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  locale: "pt" | "en";
  serviceType?: string;
  purpose?: string;
  comments?: string;
  motorBrand?: string;
  motorModel?: string;
  motorYear?: string;
  healthPlan?: string;
  oilGasSegment?: string;
  miningCoverages?: string;
  reinsuranceType?: string;
  otherDescription?: string;
}
