import express from "express";
import {
  getInvoices,
  getInvoicesThisMonth,
  getInvoicesLastMonth,
  getInvoicesThisYear,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/this-month", getInvoicesThisMonth);
router.get("/last-month", getInvoicesLastMonth);
router.get("/this-year", getInvoicesThisYear);

export default router;
