import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { dbConnect } from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (req.method === "GET") {
    return res.json(user.habits || []);
  }

  if (req.method === "POST") {
    user.habits = req.body;
    await user.save();
    return res.json({ success: true });
  }

  res.status(405).end();
}
