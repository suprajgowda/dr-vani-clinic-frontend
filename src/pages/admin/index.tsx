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
  const router = useRouter();

  const [rows, setRows] = useState<Submission[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 25; // fixed as requested
  const [total, setTotal] = useState(0);

  async function fetchData(currentPage: number) {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/submissions?page=${currentPage}&pageSize=${pageSize}`
      );
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Failed to load");
        setRows([]);
        setTotal(0);
      } else {
        setErr(null);
        setRows(data.submissions || []);
        setTotal(data.total || 0);
      }
    } catch (e) {
      const err = e as Error;
      setErr(err?.message || "Something went wrong");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function logout() {
    await fetch("/api/admin/logout");
    router.replace("/admin/login");
  }

  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1 && !loading;
  const canNext = page < maxPage && !loading && total > 0;

  return (
    <main className="min-h-screen bg-gray-50 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto bg-white rounded shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 border-b">
          <h1 className="text-lg sm:text-xl font-semibold">
            Contact Submissions
          </h1>
          <button
            onClick={logout}
            className="text-xs sm:text-sm bg-red-500 px-3 py-1.5 rounded hover:bg-red-400 text-white cursor-pointer self-start sm:self-auto"
          >
            Logout
          </button>
        </div>

        {/* Top bar: status + pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-b">
          <div className="text-sm text-gray-600">
            {loading ? (
              "Loading…"
            ) : total > 0 ? (
              <>
                Showing{" "}
                <span className="font-medium">
                  {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span>
              </>
            ) : (
              "No submissions yet"
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
              className="px-3 py-1.5 text-sm bg-gray-100 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page <span className="font-semibold">{page}</span> / {maxPage}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={!canNext}
              className="px-3 py-1.5 text-sm bg-gray-100 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Error */}
        {err && <div className="p-4 text-red-600">{err}</div>}

        {!err && (
          <>
            {/* Mobile: Card list */}
            <div className="md:hidden p-3 space-y-3">
              {rows.length === 0 && !loading && (
                <div className="p-6 text-center text-gray-500 bg-gray-50 rounded">
                  No submissions yet
                </div>
              )}

              {rows.map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-3 bg-white shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-gray-900">
                      {r.name || "—"}
                    </div>
                    <div className="text-[11px] text-gray-500 whitespace-nowrap">
                      {r.created_at
                        ? new Date(r.created_at).toLocaleString()
                        : "—"}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        Email
                      </div>
                      <div className="text-sm break-words">
                        {r.email ? (
                          <a
                            href={`mailto:${r.email}`}
                            className="text-blue-600 underline break-words"
                          >
                            {r.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        Phone
                      </div>
                      <div className="text-sm">
                        {r.phone ? (
                          <a
                            href={`tel:${r.phone}`}
                            className="text-blue-600 underline"
                          >
                            {r.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        Preferred Date
                      </div>
                      <div className="text-sm">
                        {r.preferred_appointment_date
                          ? new Date(
                              r.preferred_appointment_date
                            ).toLocaleDateString()
                          : "—"}
                      </div>
                    </div>

                    <div className="xs:col-span-2">
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        Message
                      </div>
                      <div className="text-sm whitespace-pre-wrap break-words">
                        {r.message || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet/Desktop: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 sticky top-0">
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
                    <tr key={r.id} className="border-t align-top">
                      <td className="p-3">
                        {r.created_at
                          ? new Date(r.created_at).toLocaleString()
                          : "—"}
                      </td>
                      <td className="p-3">{r.name || "—"}</td>
                      <td className="p-3 break-all">
                        {r.email ? (
                          <a
                            href={`mailto:${r.email}`}
                            className="text-blue-600 underline"
                          >
                            {r.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">
                        {r.phone ? (
                          <a
                            href={`tel:${r.phone}`}
                            className="text-blue-600 underline"
                          >
                            {r.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">
                        {r.preferred_appointment_date
                          ? new Date(
                              r.preferred_appointment_date
                            ).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="p-3 whitespace-pre-wrap max-w-[28rem] break-words">
                        {r.message || "—"}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        No submissions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom pagination (duplicate for long lists) */}
            <div className="flex justify-between items-center p-4 border-t text-sm">
              <button
                disabled={!canPrev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page <span className="font-semibold">{page}</span> / {maxPage}
              </span>
              <button
                disabled={!canNext}
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
