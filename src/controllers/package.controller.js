const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { packageService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createPackage = async (req, resp, next) => {
  try {
    await packageService.createPackage(req.body);
    resp.status(200).json({ status: 200, data: { message: "Package added" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const updatePackage = async (req, resp, next) => {
  try {
    const packageDoc = await packageService.updatePackage(
      req.params.id,
      req.body
    );
    resp.status(200).json({ status: 200, data: packageDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const getPackageById = async (req, resp, next) => {
  try {
    const packageDoc = await packageService.getPackageById(req.params.id);

    resp
      .set("Cache-Control", "no-store")
      .status(200)
      .json({ status: 200, data: packageDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const findandfilter = async (req, resp, next) => {
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

    const result = await packageService.findandfilter(filter, options);

    resp.status(200).json({ status: 200, data: result });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const deletePackage = async (req, resp, next) => {
  try {
    await packageService.deletePackage(req.params.id);
    resp
      .status(200)
      .json({ status: 200, data: { message: "Package has been deleted" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  updatePackage,
  getPackageById,
  findandfilter,
  deletePackage,
  createPackage,
};
