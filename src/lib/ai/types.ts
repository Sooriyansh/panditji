export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };

export type BookingPrefill = Partial<{
  fullName: string;
  phone: string;
  email: string;
  city: string;
  pujaService: string;
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening" | "discuss";
  locationType: "ujjain" | "online" | "other" | "discuss";
  otherLocation: string;
  purpose: string;
  additionalInfo: string;
}>;

export type AssistantAction =
  | { type: "OPEN_SERVICE_PAGE"; data: { route: string } }
  | { type: "START_BOOKING"; data: { pujaService?: string } }
  | { type: "PREFILL_BOOKING_FORM"; data: BookingPrefill }
  | { type: "CONTACT_PANDIT"; data: Record<string, never> }
  | { type: "OPEN_CONSULTATION"; data: Record<string, never> }
  | { type: "SHOW_FAQ"; data: Record<string, never> };

export type AssistantReply = { message: string; action?: AssistantAction };
