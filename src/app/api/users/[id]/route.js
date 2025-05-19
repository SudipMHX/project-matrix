
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(_, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const user = await User.findById(id);
    if (!user)
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404 }
      );
    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const body = await req.json();

  try {
    const updatedFields = { ...body };
    if (body.password) {
      updatedFields.password = await bcrypt.hash(body.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400 }
    );
  }
}

export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = params;

  try {
    await User.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ success: true, message: "User deleted" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400 }
    );
  }
}
