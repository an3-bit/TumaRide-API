const { createError } = require("../configs/errorConfig.js");
const { Document } = require("../models/index.js");
const { ObjectId } = require("mongodb");

const createDocument = async (body) => {
  try {
    const document = new Document(body);
    return await document.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateDocument = async (id, body) => {
  const documentData = await Document.findOne({ _id: new ObjectId(id) });
  if (!documentData) {
    throw createError(400, "Invalid document ID");
  }

  const updatedDocument = await Document.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );

  return updatedDocument;
};

const getDocumentById = async (documentId) => {
  const document = await Document.findById(new ObjectId(documentId));

  if (!document) {
    throw createError(404, "Document not found!");
  }

  return document;
};

const findAndFilterDocuments = async (filter, options) => {
  const documents = await Document.paginate(filter, options);
  if (!documents) {
    throw createError(404, "Documents not found.");
  }
  return documents;
};

const deleteDocument = async (id) => {
  const deletedDocument = await Document.findByIdAndUpdate(new ObjectId(id), {
    $set: { is_deleted: true },
  });

  return deletedDocument;
};

module.exports = {
  createDocument,
  updateDocument,
  getDocumentById,
  findAndFilterDocuments,
  deleteDocument,
};
