import { Router } from "express";
import { getConversionRates } from "../services/ethServices";

const router = Router();

router.get("/", (req, res) => {
  try {
    const rates = getConversionRates();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rates" });
  }
});

export default router;
