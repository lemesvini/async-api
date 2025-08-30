import { z } from "zod";

// Login request schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Register request schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(1, "Full name is required"),
  role: z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
  phone: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

// Refresh token schema
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// Export types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
