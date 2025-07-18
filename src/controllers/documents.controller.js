const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { documentService, logsService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createDocument = async (req, resp, next) => {
  try {
    await documentService.createDocument(req.body);
    resp.status(200).json({ status: 200, data: { message: "Document added" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const updateDocument = async (req, resp, next) => {
  try {
    const documentDoc = await documentService.updateDocument(
      req.params.id,
      req.body
    );
    resp.status(200).json({ status: 200, data: documentDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const getDocumentById = async (req, resp, next) => {
  try {
    const documentDoc = await documentService.getDocumentById(req.params.id);
    resp.status(200).json({ status: 200, data: documentDoc });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const findAndFilterDocuments = async (req, resp, next) => {
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

    const result = await documentService.findAndFilterDocuments(
      filter,
      options
    );
    resp.status(200).json({ status: 200, data: result });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const deleteDocument = async (req, resp, next) => {
  try {
    await documentService.deleteDocument(req.params.id);
    logsService.createLog({
      user_id: req.user._id,
      type: "audit",
      module: "document",
      title: "document deleted ",
      description: "user deleted a document",
      data: {
        _id: req.params.id,
      },
    });
    resp
      .status(200)
      .json({ status: 200, data: { message: "Document has been deleted" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  updateDocument,
  getDocumentById,
  findAndFilterDocuments,
  deleteDocument,
  createDocument,
};
