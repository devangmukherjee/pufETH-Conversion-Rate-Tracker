import axios from "axios";
import { TickData } from "src/components/RateChart";

export const getRateData = async (): Promise<TickData[]> => {
  try {
    const response = await axios.get<TickData[]>(
      "http://localhost:4000/api/rate"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rate data:", error);
    return [];
  }
};
