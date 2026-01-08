import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, password, email } = body;
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    // create user + profile
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        profile: {
          create: {
            fullName,
          },
        },
      },
      include: { profile: true },
    });

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
