import app from "./app.js";
import pool from "./config/database.js";

import {
  createUser,
  // getAllUsers,
  // getUserById,
//   updateUser,
//   deleteUser,
} from "./services/employee.service.js";

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("PostgreSQL connection successful");

    // insert funcition

    // const newUser = await createUser(
    //   "Rahul",
    //   "rahul@gmail.com",
    //   25
    // );

    // console.log("Inserted User:", newUser);

    // const users = await getAllUsers();
    // console.log("All Users:", users);

    
    // const user = await getUserById(1);
    // console.log("Single User:", user);

    // UPDATE USER
    // const updatedUser = await updateUser(
    //   1,
    //   "Rahul Sharma",
    //   "rahul@gmail.com",
    //   26
    // );

    // console.log("Updated User:", updatedUser);

   
    // const deletedUser = await deleteUser(1);
    // console.log("Deleted User:", deletedUser);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server error:", error);
    await pool.end();
    process.exit(1);
  }
};

startServer();