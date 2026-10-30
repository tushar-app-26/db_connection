import { createServer } from "node:http";
import { employeeRoutes } from "./routes/employee.route.js";

const app = createServer(async (req, res) => {
  try {
    const handled = await employeeRoutes(req, res);

    if (!handled) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
        })
      );
    }
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: false,
          message: "Internal server error",
        })
      );
    }
  }
});

export default app;