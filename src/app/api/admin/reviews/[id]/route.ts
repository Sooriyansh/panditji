import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { currentAdmin } from "@/lib/permissions";

export const runtime = "nodejs";
type RouteContext = { params: Promise<{ id: string }> };
function text(value: unknown, limit: number) { return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, limit) : ""; }

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!await currentAdmin()) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid rating ID." }, { status: 400 });
  let payload: Record<string, unknown>;
  try { payload = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "Invalid rating data." }, { status: 400 }); }
  const name = text(payload.name, 60); const comment = text(payload.comment, 500); const rating = Number(payload.rating);
  if (name.length < 2 || !Number.isInteger(rating) || rating < 1 || rating > 5) return NextResponse.json({ message: "Name and a 1–5 star rating are required." }, { status: 400 });
  try {
    const result = await (await getDatabase()).collection("reviews").updateOne({ _id: new ObjectId(id) }, { $set: { name, rating, ...(comment ? { comment } : {}), updatedAt: new Date() }, ...(comment ? {} : { $unset: { comment: "" } }) });
    if (!result.matchedCount) return NextResponse.json({ message: "Rating not found." }, { status: 404 });
    return NextResponse.json({ message: "Rating updated." });
  } catch (error) { console.error("Review update failed", error); return NextResponse.json({ message: "Rating could not be updated." }, { status: 503 }); }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!await currentAdmin()) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid rating ID." }, { status: 400 });
  try {
    const result = await (await getDatabase()).collection("reviews").deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return NextResponse.json({ message: "Rating not found." }, { status: 404 });
    return NextResponse.json({ message: "Rating deleted." });
  } catch (error) { console.error("Review delete failed", error); return NextResponse.json({ message: "Rating could not be deleted." }, { status: 503 }); }
}
