import { Report } from "../models/report.js"

const postReport = async (req, res) => {
  try {
    const { type, dateTime, desc, location, witness, severity, requester, houseId } = req.body

    if (!type || !dateTime || !desc || !location || !witness || !severity || !requester || !houseId) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const newReport = await Report.create({
      type,
      dateTime,
      desc,
      location,
      witness,
      severity,
      requester,
      houseId,
    })

    return res.status(201).json(newReport)
  } catch (error) {
    console.error("Report creation error:", error)
    return res.status(500).json({ message: "Server error while processing Report" })
  }
}

const getReportsByRequester = async (req, res) => {
  try {
    const { requesterId } = req.params

    if (!requesterId) {
      return res.status(400).json({ message: "Requester ID is required" })
    }

    const reports = await Report.find({ requester: requesterId }).sort({ dateTime: -1 })
    return res.status(200).json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    return res.status(500).json({ message: "Server error while fetching reports" })
  }
}

export { postReport, getReportsByRequester }