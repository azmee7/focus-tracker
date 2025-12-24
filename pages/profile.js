import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({});
  const [goal, setGoal] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setGoal(data.goal || "");
      });
  }, []);

  const saveGoal = async () => {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal })
    });
    alert("Goal saved");
  };

  if (!session) return null;

  return (
    <div className="container card">
      <h2>Profile</h2>

      <img
        src={session.user.image}
        className="profile-img"
        width="90"
      />

      <p><b>Name:</b> {session.user.name}</p>
      <p><b>Email:</b> {session.user.email}</p>

      <input
        placeholder="Your main focus goal"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />

      <button className="btn" onClick={saveGoal}>
        Save Goal
      </button>
    </div>
  );
}
