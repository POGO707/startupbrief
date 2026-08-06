import { NextResponse } from "next/server";
import { defaultWidgetSettings, WidgetSettings } from "@/lib/widgets";

// In-memory runtime settings cache for instant response
let currentSettings: WidgetSettings = { ...defaultWidgetSettings };

export async function GET() {
  return NextResponse.json({ settings: currentSettings });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    currentSettings = {
      ...currentSettings,
      ...body,
    };
    return NextResponse.json({ success: true, settings: currentSettings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update widget settings" }, { status: 500 });
  }
}
