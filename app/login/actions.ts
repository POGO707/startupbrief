"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email.toLowerCase() !== "moinuddinhassan758@gmail.com") {
    return { error: "Access Denied. You are not authorized to access the Admin Dashboard." };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Supabase Auth Error:", error);
    console.log("Supabase Auth Data:", data);

    if (error) {
      console.error("EXACT ERROR:", error.message, error.status, error.name);
      return { error: error.message };
    }

  } catch (error: any) {
    console.error("EXACT CATCH ERROR:", error);
    return { error: error.message || "A network or configuration error occurred." };
  }

  // Redirect must be called OUTSIDE the try-catch block!
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
