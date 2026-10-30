
import type { IncomingMessage, ServerResponse } from "node:http";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/employee.service.js";

interface UserInput {
  name: string;
  email: string;
  age: number;
}

const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  data: unknown
) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
};

const readBody = async (req: IncomingMessage): Promise<UserInput> => {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString());
};

export const fetchEmployees = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const users = await getAllUsers();

  sendResponse(res, 200, {
    success: true,
    data: users,
  });
};

export const fetchEmployeeById = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  const user = await getUserById(id);

  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, 200, {
    success: true,
    data: user,
  });
};

export const addEmployee = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const body = await readBody(req);

  if (
    !body.name?.trim() ||
    !body.email?.trim() ||
    typeof body.age !== "number" ||
    !Number.isInteger(body.age)
  ) {
    return sendResponse(res, 400, {
      success: false,
      message: "Valid name, email and age are required",
    });
  }

  const user = await createUser(
    body.name.trim(),
    body.email.trim(),
    body.age
  );

  sendResponse(res, 201, {
    success: true,
    message: "User created successfully",
    data: user,
  });
};

export const editEmployee = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  const body = await readBody(req);

  if (
    !body.name?.trim() ||
    !body.email?.trim() ||
    typeof body.age !== "number" ||
    !Number.isInteger(body.age)
  ) {
    return sendResponse(res, 400, {
      success: false,
      message: "Valid name, email and age are required",
    });
  }

  const user = await updateUser(
    id,
    body.name.trim(),
    body.email.trim(),
    body.age
  );

  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, 200, {
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const removeEmployee = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) => {
  const user = await deleteUser(id);

  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, 200, {
    success: true,
    message: "User deleted successfully",
  });
};
