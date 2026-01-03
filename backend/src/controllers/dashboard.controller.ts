import { Request, Response } from "express";
import Lead from "../models/lead.model";
import Employee from "../models/employee.model";

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const [
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      totalEmployees,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      Lead.countDocuments({ status: "converted" }),
      Employee.countDocuments({ isActive: true }),
    ]);

    res.json({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};


export const leadsByStatus = async (_req: Request, res: Response) => {
  const data = await Lead.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json(data);
};


//per employee lead

export const leadsPerEmployee = async (_req: Request, res: Response) => {
  const data = await Lead.aggregate([
    {
      $match: { assignedTo: { $ne: null } },
    },
    {
      $group: {
        _id: "$assignedTo",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    {
      $unwind: "$employee",
    },
    {
      $project: {
        _id: 0,
        employeeName: "$employee.name",
        count: 1,
      },
    },
  ]);

  res.json(data);
};

