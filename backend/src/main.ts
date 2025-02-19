import { Body, Controller, ForbiddenException, Get, Headers, Module, Param, Patch, Query } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Pool } from "pg";
import "reflect-metadata";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ops_db",
});
