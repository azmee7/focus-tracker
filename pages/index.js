import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Index() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="center">
      <h1>⚡ Focus Habit Tracker</h1>
      <p>Track habits • Build streaks • Improve focus</p>

      <button className="btn" onClick={() => signIn("google")}>
        Sign in with Google
      </button>

      <small style={{ marginTop: 10, color: "var(--muted)" }}>
        Free • Secure • Cloud synced
      </small>
    </div>
  );
}
