import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";
import cookieParser from "cookie-parser";
import leadRoutes from "./routes/lead.routes";
import dashboardRoutes from "./routes/dashboard.routes";



const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
//test
app.get("/test", (req, res) => {
  res.send("API working");
});


//auth
app.use("/api/auth", authRoutes);
//employee
app.use("/api/employees", employeeRoutes);
//lead
app.use("/api/leads", leadRoutes);
//dashboard
app.use("/api/dashboard", dashboardRoutes);



export default app;
