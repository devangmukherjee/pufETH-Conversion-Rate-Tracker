import express from "express";
import cors from "cors";
import rateRoutes from "./routes/rateRoutes";
import { scheduleFetchRate } from "./utils/scheduler";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/rate", rateRoutes);

// Start the scheduler to periodically fetch rates
scheduleFetchRate();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
