import { logout } from "@/app/admin/logout/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </form>
  );
}