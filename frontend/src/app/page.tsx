"use client";

import { useEffect, useState } from "react";

interface OpsItem {
  id: number;
  title: string;
  owner_email: string;
  status: string;
}

export default function OpsDashboard() {
  const [items, setItems] = useState<OpsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:4023/ops/items?page=${page}&limit=10`)
      .then((r) => {
        if (!r.ok) throw new Error("failed to load");
        return r.json();
      })
      .then((d) => setItems(d.items || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <main style={{ maxWidth: 760, margin: "32px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Operations Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            #{it.id} {it.title} ({it.owner_email}) — <strong>{it.status}</strong>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
}
