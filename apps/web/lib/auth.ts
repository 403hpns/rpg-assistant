import { cookies } from "next/headers";
import apiClient from "@/lib/axios";

export async function getServerSession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return null;
  }

  try {
    const { data } = await apiClient.get("/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${jwt}` },
    });


    return data
  } catch (error) {
    console.error("Błąd walidacji sesji:", error);
    return null;
  }
}
