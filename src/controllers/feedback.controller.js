const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { feedbackService, logsService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createFeedback = async (req, resp, next) => {
  try {
    await feedbackService.createFeedback(req.body);
    resp.status(200).json({ status: 200, data: { message: "Feedback added" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const updateFeedback = async (req, resp, next) => {
  try {
    const feedbackDoc = await feedbackService.updateFeedback(
      req.params.id,
      req.body
    );
    logsService.createLog({
      user_id: req.user._id,
      type: "audit",
      module: "feedback",
      title: "feedback updated ",
      description: "user  edited there feedback",
      data: {
        _id: req.params.id,
      },
    });
    resp.status(200).json({ status: 200, data: feedbackDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const getFeedbackById = async (req, resp, next) => {
  try {
    const feedbackDoc = await feedbackService.getFeedbackById(req.params.id);
    resp.status(200).json({ status: 200, data: feedbackDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const findAndFilterFeedbacks = async (req, resp, next) => {
  try {
    let filter = { is_deleted: false };

    for (key in req.body.match_values) {
      if (req.body.match_values[key] || req.body.match_values[key] === "") {
        filter[key] = req.body.match_values[key];
      }
      if (ObjectId.isValid(req.body.match_values[key]))
        filter[key] = new ObjectId(req.body.match_values[key]);
      else if (Array.isArray(req.body.match_values[key]))
        filter[key] = { $in: req.body.match_values[key] };
    }

    const options = pick(req.body, ["sortBy", "limit", "page"]);

    if (req.body?.search) {
      filter["$or"] = [
        {
          name: { $regex: ".*" + req.body.search + ".*", $options: "i" },
        },
        {
          email: { $regex: ".*" + req.body.search + ".*", $options: "i" },
        },
      ];
    }

    const result = await feedbackService.findAndFilterFeedbacks(
      filter,
      options
    );
    resp.status(200).json({ status: 200, data: result });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const deleteFeedback = async (req, resp, next) => {
  try {
    await feedbackService.deleteFeedback(req.params.id);
    logsService.createLog({
      user_id: req.user._id,
      type: "audit",
      module: "feedback",
      title: " feedback deleted",
      description: "user deleted  a feedback",
      data: {
        _id: req.params.id,
      },
    });
    resp
      .status(200)
      .json({ status: 200, data: { message: "Feedback has been deleted" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  updateFeedback,
  getFeedbackById,
  findAndFilterFeedbacks,
  deleteFeedback,
  createFeedback,
};
