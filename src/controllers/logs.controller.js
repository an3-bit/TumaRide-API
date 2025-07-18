const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { logsService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createLogs = async (req, resp, next) => {
  try {
    await logsService.createLogs(req.body);
    resp.status(200).json({ status: 200, data: { message: "Logs added" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const updateLogs = async (req, resp, next) => {
  try {
    const logDoc = await logsService.updateLogs(req.params.id, req.body);
    resp.status(200).json({ status: 200, data: logDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const getLogsById = async (req, resp, next) => {
  try {
    const logDoc = await logsService.getLogsById(req.params.id);
    resp
      .set("Cache-Control", "no-store")
      .status(200)
      .json({ status: 200, data: logDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const findAndFilterLogs = async (req, resp, next) => {
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

    const result = await logsService.findAndFilterLogs(filter, options);
    resp.status(200).json({ status: 200, data: result });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  updateLogs,
  getLogsById,
  findAndFilterLogs,
  createLogs,
};
