import { Request, Response } from "express";
import Lead from "../models/lead.model";

//create
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//get all lead
export const getLeads = async (_: Request, res: Response) => {
  const leads = await Lead.find().populate("assignedTo", "name email");
  res.status(200).json(leads);
};

//get singal lead
export const getLeadById = async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id).populate(
    "assignedTo",
    "name email"
  );
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json(lead);
};

//update
export const updateLead = async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json(lead);
};

//delete
export const deleteLead = async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json({ message: "Lead deleted" });
};
