import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { currentAdmin } from "@/lib/permissions";
import type { Review } from "@/types/review";

export const runtime = "nodejs";
type ReviewDocument = Omit<Review, "id" | "createdAt" | "updatedAt"> & { _id: { toString(): string }; createdAt: Date; updatedAt: Date };

export async function GET() {
  if (!await currentAdmin()) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
  try {
    const reviews = await (await getDatabase()).collection<ReviewDocument>("reviews").find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ reviews: reviews.map(({ _id, ...review }) => ({ ...review, id: _id.toString(), createdAt: review.createdAt.toISOString(), updatedAt: review.updatedAt.toISOString() })) });
  } catch (error) {
    console.error("Admin review list failed", error);
    return NextResponse.json({ message: "Ratings could not be loaded." }, { status: 503 });
  }
}
