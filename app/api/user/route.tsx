// api/user/route.tsx
import { db } from "@/config/db";
import { usersTable } from "@/config/schema"; 
import { currentUser } from "@clerk/nextjs/server"; 
import { eq } from "drizzle-orm";
// Removed the accidental internal next/dist import
import { NextRequest, NextResponse } from "next/server"; // Added NextResponse here

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ guest: true });
  }

  const email = user.primaryEmailAddress.emailAddress;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users.length === 0) {
    const result = await db.insert(usersTable).values({
      name: user.fullName ?? "",
      email,
    }).returning();

    return NextResponse.json(result[0]);
  }

  return NextResponse.json(users[0]);
}