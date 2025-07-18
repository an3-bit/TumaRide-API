const { createError } = require("../configs/errorConfig.js");
const { Payment } = require("../models/index.js");
const { ObjectId } = require("mongodb");

const createPayment = async (body) => {
  try {
    const payment = new Payment(body);
    return await payment.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updatePayment = async (id, body) => {
  const paymentData = await Payment.findOne({ _id: new ObjectId(id) });
  if (!paymentData) {
    throw createError(400, "Invalid payment id");
  }

  const updatedPayment = await Payment.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return updatedPayment;
};

const getPaymentById = async (paymentId) => {
  const paymentDoc = await Payment.findById(new ObjectId(paymentId));

  if (!paymentDoc) {
    throw createError(404, "Payment not found!");
  }

  return paymentDoc;
};

const findAndFilterPayments = async (filter, options) => {
  const payments = await Payment.paginate(filter, options);
  if (!payments) {
    throw createError(404, "Payments not found.");
  }
  return payments;
};

module.exports = {
  updatePayment,
  createPayment,
  findAndFilterPayments,
  getPaymentById,
};
