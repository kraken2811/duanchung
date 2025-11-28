export const DECLARATION_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  COMPLETED: "completed",
  INSPECTION: "inspection",
  CANCELLED: "cancelled",
  REQUIRES_REVISION: "requires_revision",
};

export const CHANNEL_TYPES = {
  GREEN: "green",
  YELLOW: "yellow",
  RED: "red",
  NONE: "none",
};

export const DECLARATION_FILTERS_DEFAULT = {
  dateRange: null,
  declarationNumber: "",
  type: "",
  partnerName: "",
  status: "",
  channel: "",
  page: 1,
  pageSize: 10,
};