import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "../../../lib/mongodb";
import User from "../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        return user;
      }
    })
  ],

  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const existing = await User.findOne({ email: user.email });

      if (!existing) {
        await User.create({
          email: user.email,
          name: user.name || "User",
          image: user.image || "",
          habits: []
        });
      }
      return true;
    },

    async session({ session }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.id = dbUser._id.toString();
      return session;
    }
  },

  session: { strategy: "jwt" }
};

export default NextAuth(authOptions);
