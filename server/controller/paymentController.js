import { Payment } from "../models/payment.js"

const postPayment = async (req, res) => {
  try {
    const { userId, houseId, paymentType, amount, processingFee, totalAmount, cardDetails, transactionId } = req.body

    if (!userId || !houseId || !paymentType || !amount || !totalAmount || !cardDetails || !transactionId) {
      return res.status(400).json({ message: "Please provide all required payment information" })
    }

    const maskedCardNumber = cardDetails.cardNumber.slice(-4).padStart(cardDetails.cardNumber.length, "*")

    const newPayment = await Payment.create({
      userId,
      houseId,
      paymentType,
      amount,
      processingFee: processingFee || 20,
      totalAmount,
      cardDetails: {
        ...cardDetails,
        cardNumber: maskedCardNumber,
      },
      transactionId,
      paymentDate: new Date(),
      status: "completed",
    })

    return res.status(201).json(newPayment)
  } catch (error) {
    console.error("Payment processing error:", error)
    return res.status(500).json({ message: "Server error while processing payment" })
  }
}

const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

    const payments = await Payment.find({ userId }).sort({ paymentDate: -1 })
    return res.status(200).json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return res.status(500).json({ message: "Server error while fetching payments" })
  }
}

export { postPayment, getPaymentsByUserId }