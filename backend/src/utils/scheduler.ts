import cron from "node-cron";
import { fetchConversionRate } from "../services/ethServices";

// Schedule the fetchConversionRate function to run every minute
export const scheduleFetchRate = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Fetching conversion rate...");
    await fetchConversionRate();
  });
};
