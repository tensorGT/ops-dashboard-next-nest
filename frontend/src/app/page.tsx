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
