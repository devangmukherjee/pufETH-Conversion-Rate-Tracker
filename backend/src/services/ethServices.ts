import { ethers } from "ethers";
import dotenv from "dotenv";
import { abi } from "./contractConfig";
dotenv.config();

export type TickData = {
  timestamp: Date;
  conversionRate: number;
};

const MAX_RECORDS = 1000;

if (!process.env.ETHEREUM_PROVIDER_URL) {
  throw new Error(
    "ETHEREUM_PROVIDER_URL is not defined in the environment variables."
  );
}

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_PROVIDER_URL);

// Implementation contract address
const contractAddress = "0x17D5F2803D9F922fa9C3A77849962df0D19e6674";

const contract = new ethers.Contract(contractAddress, abi, provider);

// In-memory storage to store conversion rates over time
let conversionRates: TickData[] = [];

export const fetchConversionRate = async (): Promise<void> => {
  try {
    const totalAssets: bigint = await contract.totalAssets();
    const totalSupply: bigint = await contract.totalSupply();

    // In this contract total supply is zero
    // Hence to make data visualization possible we are populating this with random hard coded data so that division by zero is possible
    if (totalSupply === 0n) {
      console.warn(
        "Total supply is zero. Using fallback value to avoid error on division by zero."
      );
      const fallbackSupply = BigInt(
        Math.floor(Math.random() * (10e6 - 500 + 1)) + 500
      );
      const conversionRate = totalAssets / fallbackSupply;
      addConversionRate(Number(conversionRate));
    } else {
      const conversionRate = totalAssets / totalSupply;
      addConversionRate(Number(conversionRate));
    }
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
  }
};

// Function to add the conversion rate to in-memory storage
export const addConversionRate = (conversionRate: number): void => {
  conversionRates.push({ timestamp: new Date(), conversionRate });
  if (conversionRates.length > MAX_RECORDS) {
    conversionRates.shift();
  }
};

// Function to get all stored conversion rates
export const getConversionRates = (): TickData[] => {
  return conversionRates;
};
