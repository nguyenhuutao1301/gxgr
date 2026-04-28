export interface User {
  massage: string;
  accessToken: string;
  orther: {
    _id: string;
    role: string;
    avatar?: string;
    username?: string;
    email?: string;
    bio?: string;
    address?: string;
    phone?: string;
    fullname?: string;
    createdAt?: string;
    updatedAt: string;
  };
}
export interface ortherUser {
  _id: string;
  role: string;
  avatar?: string;
  username?: string;
  email?: string;
  bio?: string;
  address?: string;
  phone?: string;
  fullname?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  bio: string;
  username: string;
}
export interface UserState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
}
export interface JwtPayloadType {
  userId: string;
  role: string;
  iat?: number;
  exp: number;
}
export interface RegisterPayloadUserType {
  email: string;
  username: string;
  password: string;
}

// Kiểu cho redirect (Next.js router)
export interface RedirectType {
  push: (path: string) => void;
}
export interface LoginPayloadUserType {
  email: string;
  password: string;
}
export interface BookingInfo {
  _id?: string; // Có thể không có nếu tạo mới

  addressFrom: string;
  addressTo: string;
  serviceType?:
    | "Grap Bike"
    | "Grap Express"
    | "Grap 4 Chỗ"
    | "Grap 7 Chỗ"
    | "Grap 16 Chỗ"
    | "Grap 29 Chỗ"; // Nếu bạn có enum cụ thể
  success?: boolean;
  phoneNumber: string;
  additionalInfo?: string;
  status?: "đang xử lí" | "đã đặt" | "hoàn thành" | "đã hủy";
  userId?: string;
  driverId?: string | null;
  cancelReason?: string;

  price?: number;
  estimatedDistanceKm?: number;
  estimatedTimeMin?: number;

  pickupTime?: Date | string;
  completedAt?: Date | string;
  autoCancelAt?: Date | string;

  rating?: number;

  paymentMethod?: "cash" | "momo" | "zaloPay" | "bank_transfer";
  paymentStatus?: "unpaid" | "paid" | "failed";

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
