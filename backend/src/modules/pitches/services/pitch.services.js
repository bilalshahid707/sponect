const { Op } = require("sequelize");
const Pitch = require("../models/pitch.model");
const Package = require("../models/package.model");
const Asset = require("../models/asset.model");
const Sponsee = require("../../../models/sponsee.model");
const AppError = require("../../../utils/AppError");
const { pitchTabs, pitchFilterFields } = require("../../../utils/Constants");
const { validateData } = require("../helpers/helpers");

exports.createPitch = async (data, sponseeId) => {
  const validatedData = validateData(pitchTabs[0], data);
  const pitch = await Pitch.create({
    ...validatedData,
    sponseeId,
    tabNumber: "0",
  });
  return pitch;
};

exports.getPitchById = async (pitchId) => {
  const pitch = await Pitch.findOne({
    where: { id: pitchId },
    include: [
      { model: Sponsee, as: "sponsee" },
      {
        model: Package,
        attributes: ["id", "title", "price", "description", "deliverables"],
        as: "packages",
      },
      {
        model: Asset,
        attributes: ["id", "type", "secureUrl", "publicId"],
        as: "assets",
      },
    ],
  });

  if (!pitch) throw new AppError("Pitch not found", 404);
  return pitch;
};

exports.getAllPitches = async (query) => {
  const page = query.page ? Number(query.page) : 1;
  const limit = 12;
  const offset = (page - 1) * limit;

  const whereClause = { status: "published" };

  Object.keys(query).forEach((key) => {
    if (!pitchFilterFields.has(key)) return;

    if (key === "expectedAudience") {
      whereClause[key] = { [Op.lte]: Number(query[key]) };
    } else if (key === "venue" || key === "category" || key === "preferences") {
      whereClause[key] = { [Op.in]: query[key].split(",") };
    } else if (key === "occupation") {
      whereClause[key] = { [Op.contains]: query[key].split(",") };
    } else {
      whereClause[key] = query[key];
    }
  });

  const pitches = await Pitch.findAll({
    where: whereClause,
    attributes: [
      "id", "title", "category", "venue", "startAt", "endAt",
      "expectedAudience", "preferences", "gender", "ageGroup", "occupation","createdAt"
    ],
    include: [
      {
        model: Sponsee,
        as: "sponsee",
        attributes: ["id", "name", "tagline", "logo", "location"],
      },
      {
        model: Asset,
        as: "assets",
        attributes: ["id", "type", "secureUrl"],
        where: { type: "cover" },
        required: false,
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return pitches;
};

// Advances tabNumber only if the incoming tab is ahead of the current one.
const advanceTab = (pitch, tabNumber) =>
  String(Math.max(Number(pitch.tabNumber), tabNumber));

exports.updateTab0 = async (pitch, data) => {
  const validatedData = validateData(pitchTabs[0], data);
  return pitch.update({
    ...validatedData,
    tabNumber: advanceTab(pitch, 0),
  });
};

exports.updateTab1 = async (pitch, data) => {
  const validatedData = validateData(pitchTabs[1], data);
  return pitch.update({
    ...validatedData,
    tabNumber: advanceTab(pitch, 1),
  });
};

exports.updateTab2 = async (pitch, data) => {
  const validatedData = validateData(pitchTabs[2], data);
  return pitch.update({
    ...validatedData,
    tabNumber: advanceTab(pitch, 2),
  });
};

exports.deletePitch = async (pitch) => {
  await pitch.destroy();
};

exports.publishPitch = async (pitch) => {
  if (pitch.status === "published") {
    throw new AppError("Pitch is already published", 400);
  }
  if (Number(pitch.tabNumber) < 2) {
    throw new AppError("Complete details and promotion tabs before publishing", 400);
  }
  return pitch.update({ status: "published" });
};
