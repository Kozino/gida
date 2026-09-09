export type Role =
  | "platform_admin"
  | "owner"
  | "manager"
  | "caretaker"
  | "accountant"
  | "security"
  | "tenant"
  | "sponsor";

export type VerificationStatus =
  | "draft"
  | "submitted"
  | "needs_info"
  | "verified"
  | "rejected";

export type OrgStatus = "pending" | "active" | "suspended";

export type ApplicationStatus =
  | "token_issued"
  | "draft"
  | "terms_accepted"
  | "payment_uploaded"
  | "documents"
  | "signed"
  | "caretaker_review"
  | "approved"
  | "rejected"
  | "active"
  | "renewal";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type GenderPolicy = "any" | "male" | "female";
export type OccupancyType = "whole_room" | "bedspace";
export type TenancyCycle = "monthly" | "quarterly" | "session" | "yearly";

export interface User {
  id: string;
  email: string;
  phone: string;
  password: string;
  name: string;
  role: Role;
  orgId?: string;
  tenantId?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: "lodge" | "hostel" | "house" | "estate" | "compound";
  status: OrgStatus;
  verification: VerificationStatus;
  ownerUserId: string;
  nin?: string;
  cac?: string;
  bankName?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  state: string;
  city: string;
  address?: string;
  whatsapp?: string;
  notes?: string;
  rejectionReason?: string;
  listed: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  description: string;
  state: string;
  city: string;
  address: string;
  genderPolicy: GenderPolicy;
  occupancyType: OccupancyType;
  cycle: TenancyCycle;
  tokenFee: number | null;
  firstYearRent: number | null;
  renewalRent: number | null;
  cautionFee: number | null;
  serviceCharge: number | null;
  published: boolean;
  rules: string;
  createdAt: string;
}

export interface Room {
  id: string;
  propertyId: string;
  orgId: string;
  name: string;
  block: string;
  beds: number;
  occupiedBeds: number;
  rent: number | null;
  amenities: string[];
  available: boolean;
}

export interface Token {
  id: string;
  orgId: string;
  propertyId: string;
  code: string;
  feePaid: boolean;
  issuedBy: string;
  usedBy?: string;
  createdAt: string;
  expiresAt: string;
}

export interface Application {
  id: string;
  orgId: string;
  propertyId: string;
  roomId?: string;
  tenantUserId: string;
  tokenId?: string;
  status: ApplicationStatus;
  applicantName: string;
  phone: string;
  schoolOrWork?: string;
  nin?: string;
  suretyName?: string;
  suretyPhone?: string;
  receiptUrl?: string;
  signedAt?: string;
  createdAt: string;
}

export interface Tenancy {
  id: string;
  orgId: string;
  propertyId: string;
  roomId: string;
  tenantUserId: string;
  startDate: string;
  endDate: string;
  rent: number | null;
  cautionHeld: number | null;
  active: boolean;
}

export interface Payment {
  id: string;
  orgId: string;
  tenantUserId: string;
  type: "token" | "rent" | "caution" | "service" | "utility" | "other";
  amount: number | null;
  method: "transfer" | "paystack" | "flutterwave" | "moniepoint" | "opay";
  reference?: string;
  receiptNote?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
}

export interface Ticket {
  id: string;
  orgId: string;
  propertyId: string;
  tenantUserId?: string;
  title: string;
  category: "plumbing" | "electrical" | "power" | "water" | "security" | "other";
  status: TicketStatus;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  orgId?: string;
  actorId: string;
  action: string;
  detail: string;
  createdAt: string;
}

export interface Store {
  users: User[];
  orgs: Organization[];
  properties: Property[];
  rooms: Room[];
  tokens: Token[];
  applications: Application[];
  tenancies: Tenancy[];
  payments: Payment[];
  tickets: Ticket[];
  audit: AuditEvent[];
  sessionUserId: string | null;
}
