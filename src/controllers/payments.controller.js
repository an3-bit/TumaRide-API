const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { paymentService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createPayment = async (req, resp, next) => {
  try {
    await paymentService.createPayment(req.body);

    resp.status(200).json({ status: 200, data: { message: "Payment added" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const updatePayment = async (req, resp, next) => {
  try {
    const paymentDoc = await paymentService.updatePayment(
      req.params.id,
      req.body
    );
    resp.status(200).json({ status: 200, data: paymentDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const getPaymentById = async (req, resp, next) => {
  try {
    const paymentDoc = await paymentService.getPaymentById(req.params.id);
    resp.status(200).json({ status: 200, data: paymentDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const findAndFilterPayments = async (req, resp, next) => {
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

    const result = await paymentService.findAndFilterPayments(filter, options);
    resp.status(200).json({ status: 200, data: result });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  updatePayment,
  getPaymentById,
  findAndFilterPayments,
  createPayment,
};
