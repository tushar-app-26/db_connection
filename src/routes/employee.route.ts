import type { IncomingMessage, ServerResponse } from "node:http";

import {
    fetchEmployees,
    fetchEmployeeById,
    addEmployee,
    editEmployee,
    removeEmployee
} from "../controllers/employee.controller.js";

export const employeeRoutes = async (
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> => {

    const url = new URL(
        req.url ?? "/",
        `http://${req.headers.host ?? "localhost"}`
    );

    const method = req.method;
    const pathname = url.pathname;

    if (pathname === "/api/employees" && method === "GET") {
        await fetchEmployees(req, res);
        return true;
    }

    if (pathname === "/api/employees" && method === "POST") {
        await addEmployee(req, res);
        return true;
    }

    const match = pathname.match(/^\/api\/employees\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (!Number.isSafeInteger(id) || id <= 0) {
            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: "Invalid employee ID"
            }));

            return true;
        }

        if (method === "GET") {
            await fetchEmployeeById(req, res, id);
            return true;
        }

        if (method === "PATCH") {
            await editEmployee(req, res, id);
            return true;
        }

        if (method === "DELETE") {
            await removeEmployee(req, res, id);
            return true;
        }
    }

    return false;
};