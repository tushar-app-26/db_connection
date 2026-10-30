import "dotenv/config";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("PostgreSQL client connected");
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL error:", error);
});

export default pool;