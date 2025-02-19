"use client";

import { useEffect, useState } from "react";

interface OpsItem {
  id: number;
  title: string;
  owner_email: string;
  status: string;
}
