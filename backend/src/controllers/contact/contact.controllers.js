const catchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const Contact = require("../../models/contact.model");
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

exports.addContact = catchAsync(async (req, res, next) => {
  const { role, id } = req.user;
  let sponsor;
  let sponsee;
  if (role === "sponsor") {
    sponsor = await getSponsor(id);
  } else if (role === "sponsee") {
    sponsee = await getSponsee(id);
  }
  const { name, email, phone } = req.body;

  const createData = sponsor
    ? { sponsorId: sponsor.id, name, email, phone }
    : { sponseeId: sponsee.id, name, email, phone };

  const contact = await Contact.create(createData);

  res.status(201).json({
    status: "success",
    data: contact,
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { role, id } = req.user;
  let sponsor;
  let sponsee;
  if (role === "sponsor") {
    sponsor = await getSponsor(id);
  } else if (role === "sponsee") {
    sponsee = await getSponsee(id);
  }

  const contactId = Number(req.params.contactId);

  if (Number.isNaN(contactId)) {
    return next(new AppError("Invalid contact id", 400));
  }

  const where = sponsor?{ id: contactId, sponsorId: sponsor.id }:{sponseeId:sponsee.id,id:contactId};
  const contact = await Contact.findOne({ where });

  if (!contact) {
    return next(new AppError("Contact not found", 404));
  }

  await contact.destroy();

  res.status(200).json({
    status:"success"
  });
});
