// pages/admin/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferred_appointment_date: string | null;
  created_at: string | null;
};

export default function AdminDashboard() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/submissions");
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) setErr(data.error || "Failed to load");
      else setRows(data.submissions || []);
    })();
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout");
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Contact Submissions</h1>
          <button
            onClick={logout}
            className="text-sm bg-red-500 px-3 py-1.5 rounded hover:bg-red-400 text-white cursor-pointer"
          >
            Logout
          </button>
        </div>

        {err ? (
          <div className="p-4 text-red-600">{err}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">When</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Preferred Date</th>
                  <th className="text-left p-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3">
                      {r.created_at
                        ? new Date(r.created_at).toLocaleString()
                        : "-"}
                    </td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">
                      {r.preferred_appointment_date
                        ? new Date(
                            r.preferred_appointment_date
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3 whitespace-pre-wrap max-w-[28rem]">
                      {r.message}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-500">
                      No submissions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
