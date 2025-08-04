import express from "express";
import {
  createServiceRequest,
  getServiceRequestById,
  getServiceRequests,
  updateServiceRequest,
} from "../controllers/serviceRequest.controller.js";

const router = express.Router();

router.post("/", createServiceRequest);
router.get("/:id", getServiceRequestById);
router.get("/", getServiceRequests);
router.put("/:id", updateServiceRequest);

export default router;
