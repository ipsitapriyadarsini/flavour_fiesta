import dbConnect from "@/db/db";
import CATEGORY from "@/db/model/recipe_category";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const allCategories = await CATEGORY.find().sort({ name: "asc" });
  return NextResponse.json({
    status: 200,
    data: allCategories,
  });
  try {
  } catch (error) {
    return NextResponse.json({ status: 500, message: "error" });
  }
}
