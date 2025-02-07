import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 4)}</pre>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
