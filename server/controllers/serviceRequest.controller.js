import ServiceRequest from "../models/serviceRequest.model.js";

export const createServiceRequest = async (req, res) => {
  try {
    const { title, description, priority, type, orderId } = req.body;

    const newServiceRequest = new ServiceRequest({
      title,
      description,
      priority,
      type,
      orderId,
      user: req.user._id,
    });

    await newServiceRequest.save();

    res.status(201).json({
      message: "Service request created successfully.",
      data: newServiceRequest,
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({
      message: "Couldn't create service request",
      error: error.message,
    });
  }
};
export const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderId", "orderNumber");

    if (!serviceRequest) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.status(200).json(serviceRequest);
  } catch (error) {
    console.error("Error fetching service request:", error);
    res.status(500).json({
      message: "Couldn't fetch service request",
      error: error.message,
    });
  }
};

export const getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find()
      .populate("user", "name email")
      .populate("orderId", "orderNumber");

    res.status(200).json(serviceRequests);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({
      message: "Couldn't fetch service requests",
      error: error.message,
    });
  }
};

export const updateServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, type, status } = req.body;

    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      {
        title,
        description,
        priority,
        type,
        status,
      },
      { new: true }
    );

    if (!updatedServiceRequest) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.status(200).json({
      message: "Service request updated successfully",
      data: updatedServiceRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't update service request",
      error: error.message,
    });
  }
};
