import { createClient } from "@/lib/supabase/server";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export type User = {
  id: string;
  email: string;
  role: "admin" | "editor" | "writer";
  name: string | null;
};

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user;
  } catch (error) {
    console.error("Auth.ts getUser Error:", error);
    return null;
  }

  if (!user) return null;

  // The user wants strict security. Let's ensure only allowed admins can access.
  if (user.email?.toLowerCase() !== "moinuddinhassan758@gmail.com") {
    // If it's an unauthorized email, log them out or just return null
    return null;
  }

  // Fetch or create user in our DB to get their role
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email || "",
        role: "admin", // First login becomes admin
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Admin",
      }
    });
  }

  return {
    id: dbUser.id,
    email: dbUser.email,
    role: dbUser.role as "admin" | "editor" | "writer",
    name: dbUser.name,
  };
}

export async function requireAdmin() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "admin") {
    throw new Error("Unauthorized: Admin role required");
  }
  return user;
}
