import { Body, Controller, ForbiddenException, Get, Headers, Module, Param, Patch, Query } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Pool } from "pg";
import "reflect-metadata";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ops_db",
});

@Controller("ops")
class OpsController {
  @Get("summary")
  async summary() {
    return (await pool.query("SELECT status, COUNT(*)::int AS count FROM ops_items GROUP BY status")).rows;
  }

  @Get("items")
  async list(@Query("page") pageStr = "1", @Query("limit") limitStr = "10") {
    const page = Math.max(1, Number(pageStr) || 1);
    const limit = Math.min(50, Math.max(1, Number(limitStr) || 10));
    const offset = (page - 1) * limit;
    const rows = (await pool.query("SELECT * FROM ops_items ORDER BY id DESC LIMIT $1 OFFSET $2", [limit, offset])).rows;
    return { page, limit, items: rows };
  }

  @Patch("items/:id")
  async updateStatus(
    @Param("id") id: string,
    @Headers("x-role") role: string,
    @Body() body: { status: "approved" | "rejected" }
  ) {
    if (role !== "admin") throw new ForbiddenException("need admin role!");
    return (await pool.query("UPDATE ops_items SET status = $1 WHERE id = $2 RETURNING *", [body.status, Number(id)])).rows[0];
  }
}
