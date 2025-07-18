const { createError } = require("../configs/errorConfig.js");
const { Feedback } = require("../models/index.js");
const { ObjectId } = require("mongodb");

const createFeedback = async (body) => {
  try {
    const feedback = new Feedback(body);
    return await feedback.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateFeedback = async (id, body) => {
  const feedbackData = await Feedback.findOne({ _id: new ObjectId(id) });
  if (!feedbackData) {
    throw createError(400, "Invalid feedback ID");
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return updatedFeedback;
};

const getFeedbackById = async (feedbackId) => {
  const feedback = await Feedback.findById(new ObjectId(feedbackId));

  if (!feedback) {
    throw createError(404, "Feedback not found!");
  }

  return feedback;
};

const findAndFilterFeedbacks = async (filter, options) => {
  const feedbacks = await Feedback.paginate(filter, options);
  if (!feedbacks) {
    throw createError(404, "Feedbacks not found.");
  }
  return feedbacks;
};

const deleteFeedback = async (id) => {
  const deleteFeedback = await Feedback.findByIdAndUpdate(
    new ObjectId(id),
    { $set: { is_deleted: true } },
    { new: true }
  );

  return deleteFeedback;
};

module.exports = {
  createFeedback,
  updateFeedback,
  getFeedbackById,
  findAndFilterFeedbacks,
  deleteFeedback,
};
