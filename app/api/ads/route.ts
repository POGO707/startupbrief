import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ads = await prisma.advertisement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, location, imageUrl, targetUrl, sponsor, adSize } = data;

    const ad = await prisma.advertisement.create({
      data: {
        title,
        location,
        imageUrl: imageUrl || "",
        targetUrl: targetUrl || "#",
        sponsor: sponsor || "Sponsor",
        adSize: adSize || "728x90",
        status: "active",
      },
    });

    return NextResponse.json({ ad });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}
