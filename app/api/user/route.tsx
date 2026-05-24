import { db } from "@/config/db";
import { usersTable } from "@/config/schema"; 
import { currentUser } from "@clerk/nextjs/server"; 
import { eq } from "drizzle-orm";
// Removed the accidental internal next/dist import
import { NextRequest, NextResponse } from "next/server"; // Added NextResponse here

export async function POST(req: NextRequest) {
  // 1. Get the current authenticated user from Clerk
  const user = await currentUser();
  
  // Guard clause: If Clerk can't find a user session, stop immediately
  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized or missing email" }, { status: 401 });
  }

  const email = user.primaryEmailAddress.emailAddress;

  // 2. Check if the user already exists in your Neon database via Drizzle
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // 3. If user doesn't exist, create them
  if (users.length === 0) {
    const data = {
      name: user.fullName ?? '',
      email: email
    }; 
    
    const result = await db.insert(usersTable).values(data).returning();
    
    // Drizzle returns an array from .returning(), so send back the first created user item
    return NextResponse.json(result[0] ?? {});
  }

  // 4. If they do exist, return the existing user data
  return NextResponse.json(users[0] ?? {});
}