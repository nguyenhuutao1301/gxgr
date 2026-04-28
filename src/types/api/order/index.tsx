import { BookingInfo } from "../../User";
type DeleteOrderByIdResult = {
  success?: boolean;
  message?: string;
  err?: string;
};
type GetHistoryUserBookingResult = {
  success?: boolean;
  message?: string;
  err?: string;
  result?: BookingInfo[];
};
type GetAllBookingResult = {
  success: boolean;
  message: string;
  result: [];
};
type setOrderResult = {
  result?: BookingInfo;
  success: boolean;
  message?: string;
  error?: string;
};
type UpdateOrderResult = {
  success: boolean;
  message: string;
};
export type {
  DeleteOrderByIdResult,
  GetHistoryUserBookingResult,
  GetAllBookingResult,
  setOrderResult,
  UpdateOrderResult,
};
