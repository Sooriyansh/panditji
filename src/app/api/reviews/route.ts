import { NextResponse } from "next/server";
import type { OptionalId, WithId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import type { Review } from "@/types/review";

export const runtime = "nodejs";

type ReviewDocument = Omit<Review, "id" | "createdAt" | "updatedAt"> & { createdAt: Date; updatedAt: Date };
const requestWindows = new Map<string, { count: number; resetAt: number }>();

function text(value: unknown, limit: number) { return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, limit) : ""; }
function serialize(review: WithId<ReviewDocument>): Review {
  const { _id, ...data } = review;
  return { ...data, id: _id.toString(), createdAt: data.createdAt.toISOString(), updatedAt: data.updatedAt.toISOString() };
}
function rateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now(); const current = requestWindows.get(key);
  if (!current || current.resetAt < now) { requestWindows.set(key, { count: 1, resetAt: now + 60 * 60_000 }); return false; }
  current.count += 1; return current.count > 3;
}

export async function GET() {
  try {
    const reviews = await (await getDatabase()).collection<ReviewDocument>("reviews").find({}).sort({ createdAt: -1 }).limit(40).toArray();
    return NextResponse.json({ reviews: reviews.map(serialize) });
  } catch (error) {
    console.error("Review list failed", error);
    return NextResponse.json({ reviews: [], message: "Ratings are temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (rateLimited(request)) return NextResponse.json({ message: "Please wait before submitting another rating." }, { status: 429 });
  let payload: Record<string, unknown>;
  try { payload = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "Invalid rating data." }, { status: 400 }); }
  const name = text(payload.name, 60); const comment = text(payload.comment, 500);
  const rating = Number(payload.rating);
  if (name.length < 2 || !Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ message: "Please enter your name and choose 1 to 5 stars." }, { status: 400 });
  try {
    const collection = (await getDatabase()).collection<ReviewDocument>("reviews");
    await collection.createIndex({ createdAt: -1 });
    const now = new Date();
    const document: OptionalId<ReviewDocument> = { name, rating, ...(comment ? { comment } : {}), createdAt: now, updatedAt: now };
    const result = await collection.insertOne(document);
    const review = await collection.findOne({ _id: result.insertedId });
    return NextResponse.json({ review: review ? serialize(review) : null, message: "Thank you for your rating!" }, { status: 201 });
  } catch (error) {
    console.error("Review create failed", error);
    return NextResponse.json({ message: "Your rating could not be saved. Please try again." }, { status: 503 });
  }
}
