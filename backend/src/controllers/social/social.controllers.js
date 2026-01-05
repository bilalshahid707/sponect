const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const Social = require("../../models/social.model");
const Sponsor = require("../../models/sponsor.model");
const Sponsee = require("../../models/sponsee.model");

const getSponsor = async (userId) => {
  const sponsor = await Sponsor.findOne({ where: { userId: userId } });
  if (!sponsor) {
    throw new AppError("No sponsor found", 404);
  }
  return sponsor;
};

const getSponsee = async (userId) => {
  const sponsee = await Sponsee.findOne({ where: { userId: userId } });
  if (!sponsee) {
    throw new AppError("No sponsee found", 404);
  }
  return sponsee;
};

exports.addSocial = catchAsync(async (req, res, next) => {
  const { role, id } = req.user;
  let sponsor;
  let sponsee;
  if (role === "sponsor") {
    sponsor = await getSponsor(id);
  } else if (role === "sponsee") {
    sponsee = await getSponsee(id);
  }
  const { name, URL, followerCount } = req.body;

  const isExist = await Social.findOne({
    where: sponsor
      ? { sponsorId: sponsor.id, name }
      : { sponseeId: sponsee.id, name },
  });

  if (isExist) {
    return next(new AppError(`${name} already added!`, 400));
  }

  const createData = sponsor
    ? { sponsorId: sponsor.id, name, URL, followerCount }
    : { sponseeId: sponsee.id, name, URL, followerCount };

  const social = await Social.create(createData);

  res.status(201).json({
    status: "success",
    data: social,
  });
});

exports.deleteSocial = catchAsync(async (req, res, next) => {
  const { role, id } = req.user;
  let sponsor;
  let sponsee;
  if (role === "sponsor") {
    sponsor = await getSponsor(id);
  } else if (role === "sponsee") {
    sponsee = await getSponsee(id);
  }

  const socialId = Number(req.params.socialId);

  if (Number.isNaN(socialId)) {
    return next(new AppError("Invalid social id", 400));
  }

  const where = sponsor?{ id: socialId, sponsorId: sponsor.id }:{sponseeId:sponsee.id,id:socialId};
  const social = await Social.findOne({ where });

  if (!social) {
    return next(new AppError("Social account not found", 404));
  }

  await social.destroy();

  res.status(200).json({
    status:"success"
  });
});
