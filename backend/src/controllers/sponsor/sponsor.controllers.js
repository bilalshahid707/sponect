const Sponsor = require("../../models/sponsor.model");
const Sponsorship = require("../../models/sponsorship.model");
const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const { uploadImage, deleteImage } = require("../../utils/Cloudinary");
const { AllowedSponsorFields } = require("../../utils/Constants");
const { Op } = require("sequelize");
const Social = require("../../models/social.model");
const Contact = require("../../models/contact.model")

exports.getSponsor = catchAsync(async (req, res, next) => {
  const id = Number(req.params.sponsorId);

  if (Number.isNaN(id)) {
    return next(new AppError("Invalid sponsor id", 400));
  }

  const sponsor = await Sponsor.findByPk(id, {
    include: [
      {
        model: Social,
        as: "socials",
        attributes: ["id", "name", "URL", "followerCount"],
      },
      {
        model: Sponsorship,
        as: "sponsorships",
        attributes: ["id", "title", "description", "thumbnailURL", "status"],
      },
      {
        model: Contact,
        as: "contacts",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
  });
  if (!sponsor) {
    return next(new AppError("no sponsor found with this sponsor id", 404));
  }
  res.status(200).json({
    status: "success",
    data: sponsor,
  });
});

exports.getAllSponsors = catchAsync(async (req, res, next) => {
  if (req.query.page <= 0) {
    return next(new AppError("Invalid page number", 400));
  }
  const excludedAttributes = new Set(["page", "order", "offset", "limit"]);
  const queryObject = { ...req.query };

  Object.keys(queryObject).forEach((key) => {
    if (excludedAttributes.has(key)) {
      delete queryObject[key];
    }
    if (queryObject[key] === "false") {
      queryObject[key] = false;
    }
    if (queryObject[key] === "true") {
      queryObject[key] = true;
    }
    if (key === "maxBudget") {
      queryObject[key] = { [Op.lte]: Number(queryObject[key]) };
    }
    if (key === "minBudget") {
      queryObject[key] = { [Op.gte]: Number(queryObject[key]) };
    }
  });

  const sponsors = await Sponsor.findAll({
    order: [["createdAt", "DESC"]],
    offset: (req.query.page - 1) * 12,
    limit: 12,
    where: queryObject,
  });
  res.status(200).json({
    status: "success",
    results: sponsors.length,
    data: sponsors,
  });
});

// Self
exports.getMySponsorProfile = catchAsync(async (req, res, next) => {
  const { id } = req.sponsor;
  const sponsor = await Sponsor.findByPk(id, {
    include: [
      {
        model: Social,
        as: "socials",
        attributes: ["id", "name", "URL", "followerCount"],
      },
      {
        model: Sponsorship,
        as: "sponsorships",
        attributes: ["id", "title", "description", "thumbnailURL", "status"],
      },
      {
        model: Contact,
        as: "contacts",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: sponsor,
  });
});

exports.updateMySponsorProfile = catchAsync(async (req, res, next) => {
  const { id: sponsorId } = req.sponsor;
  const sponsor = await Sponsor.findByPk(sponsorId);

  const allowedFields = AllowedSponsorFields;
  const keys = Object.keys(req.body).filter((key) => allowedFields.has(key));

  const filteredBody = {};
  keys.forEach((key) => {
    filteredBody[key] = req.body[key];
  });

  await sponsor.update(filteredBody);

  res.status(200).json({
    status: "success",
    data: sponsor,
  });
});

exports.updateLogo = catchAsync(async (req, res, next) => {
  const { id: sponsorId } = req.sponsor;
  const sponsor = await Sponsor.findByPk(sponsorId);
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }
  const { buffer } = req.file;

  if (sponsor.logo?.publicId) {
    await deleteImage(sponsor.logo.publicId);
  }

  const image = await uploadImage(buffer, "sponsors");

  await sponsor.update({
    logo: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });

  res.status(200).json({
    status: "success",
    data: sponsor,
  });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  const { id: sponsorId } = req.sponsor;
  const sponsor = await Sponsor.findByPk(sponsorId);
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }
  const { buffer } = req.file;

  if (sponsor.cover?.publicId) {
    await deleteImage(sponsor.cover.publicId);
  }

  const image = await uploadImage(buffer, "sponsors");

  await sponsor.update({
    cover: {
      url: image.secureUrl,
      publicId: image.publicID,
    },
  });

  res.status(200).json({
    status: "success",
    data: sponsor,
  });
});

exports.addSponsorship = catchAsync(async (req, res, next) => {
  const { id: sponsorId } = req.sponsor;
  const { title, description, amountSponsored, status } = req.body;
  const sponsorshipCount = await Sponsorship.count({
    where: { status: status, sponsorId: sponsorId },
  });
  if (sponsorshipCount >= 3) {
    return next(
      new AppError(`You can only add upto 3 ${status} sponsorships`, 400)
    );
  }

  let image;
  let buffer;
  if (req.file) {
    buffer = req.file.buffer;
    image = await uploadImage(buffer, "sponsors");
  }

  const thumbnailURL = image?.secureUrl;
  const thumbnailPublicID = image?.publicID;

  const sponsorship = await Sponsorship.create({
    sponsorId: sponsorId,
    title,
    description,
    amountSponsored,
    thumbnailURL,
    thumbnailPublicID,
    status,
  });
  res.status(201).json({
    status: "success",
    data: sponsorship,
  });
});

exports.getSponsorship = catchAsync(async (req, res, next) => {
  const sponsorshipId = req.params.sponsorshipId;

  if (Number.isNaN(sponsorshipId)) {
    return next(new AppError("Invalid sponsorship id", 400));
  }
  const sponsorship = await Sponsorship.findByPk(sponsorshipId);
  if (!sponsorship) {
    return next(new AppError("No past sponsorship found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: sponsorship,
  });
});

exports.deleteSponsorship = catchAsync(async (req, res, next) => {
  const sponsorshipId = req.params.sponsorshipId;
  if (Number.isNaN(sponsorshipId)) {
    return next(new AppError("Invalid sponsorship id", 400));
  }
  const sponsorship = await Sponsorship.findByPk(sponsorshipId);
  if (!sponsorship) {
    return next(new AppError("Sponsorship not found", 404));
  }

  if (sponsorship.thumbnailPublicID) {
    await deleteImage(sponsorship.thumbnailPublicID);
  }
  await sponsorship.destroy();

  res.status(204).send();
});

