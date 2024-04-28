const express = require("express");
const { employeeModel } = require("../model/employeeModel");
const employeeRoute = express.Router();


employeeRoute.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        const employeeData = await employeeModel.find({ userId });
        return res.status(200).json({ employeeData });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

employeeRoute.post("/", async (req, res) => {
    try {
        const { name, address, department, gender, dateOfJoining, hobbies } = req.body;
        const userId = req.userId;
        if (!name || !address || !department || !gender || !dateOfJoining || !hobbies) {
            return res.status(400).json({ msg: "all fields are required" });
        }
        const newEmployeeData = new employeeModel({ ...req.body, userId });

        await newEmployeeData.save();

        return res.status(200).json({ msg: "Employee data stored successfully", employeeData: { ...req.body, userId } });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

employeeRoute.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const employeeData = await employeeModel.findOne({ _id: id });

        if (userId !== employeeData.userId.toString()) {
            return res.status(400).json({ msg: "you are not authorized" });
        } else {
            
            await employeeModel.findByIdAndUpdate({ _id: id }, req.body);
            return res.status(200).json({ msg: "data has been updated successfully" });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

employeeRoute.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const employeeData = await employeeModel.findOne({ _id: id });
        
        if (userId !== employeeData.userId.toString()) {
            
            return res.status(400).json({ msg: "you are not authorized" });
        } else {
        
            await employeeModel.findByIdAndDelete({ _id: id });
            return res.status(200).json({ msg: "data has been deleted successfully" });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})


module.exports={employeeRoute};