export const bookingStatuses = ["pending", "contacted", "confirmed", "cancelled"] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export type Booking = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  pujaService: string;
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening" | "discuss";
  locationType: "ujjain" | "online" | "other" | "discuss";
  otherLocation?: string;
  purpose: string;
  additionalInfo?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export type BookingStats = Record<"total" | BookingStatus, number>;
