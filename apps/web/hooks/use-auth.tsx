"use client";

import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth musi być używany wewnątrz AuthProvider");
  }
  return context;
}
