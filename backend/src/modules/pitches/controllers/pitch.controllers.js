const catchAsync = require("../../../utils/CatchAsync");
const AppError = require("../../../utils/AppError");
const PitchService = require("../services/pitch.services");

exports.getAllPitches = catchAsync(async (req, res, next) => {
  const page = Number(req.query.page);
  if (req.query.page !== undefined && (Number.isNaN(page) || page < 1)) {
    return next(new AppError("Invalid page number", 400));
  }

  const pitches = await PitchService.getAllPitches(req.query);
  res.status(200).json({ status: "success", results: pitches.length, data: pitches });
});

exports.getPitchById = catchAsync(async (req, res) => {
  const { pitchId } = req.params;

  if (Number.isNaN(Number(pitchId))) {
    throw new AppError("Invalid id", 400);
  }

  const pitch = await PitchService.getPitchById(pitchId);
  res.status(200).json({ status: "success", data: pitch });
});

exports.getPitchesBySponseeId = catchAsync(async(req,res)=>{
  const {id:sponseeId} = req.sponsee
  const {status} = req.query

  const pitches=  await PitchService.getPitchesBySponseeId(sponseeId,status?status:'published')
  res.status(200).json({ status: "success", data: pitches });
})
exports.createPitch = catchAsync(async (req, res) => {
  const { id: sponseeId } = req.sponsee;
  const pitch = await PitchService.createPitch(req.body, sponseeId);
  res.status(201).json({ status: "success", data: pitch });
});

// Routes to the correct tab service based on req.tab.number (set by validateTab middleware).
const tabHandlers = {
  0: PitchService.updateTab0,
  1: PitchService.updateTab1,
  2: PitchService.updateTab2,
};

exports.updatePitch = catchAsync(async (req, res, next) => {
  const handler = tabHandlers[req.tab.number];
  if (!handler) {
    return next(new AppError(`Tab ${req.tab.number} is not handled by this route`, 400));
  }

  const updatedPitch = await handler(req.pitch, req.body);
  res.status(200).json({ status: "success", data: updatedPitch });
});

exports.deletePitch = catchAsync(async (req, res) => {
  await PitchService.deletePitch(req.pitch);
  res.status(204).json({ status: "success", data: null });
});

exports.publishPitch = catchAsync(async (req, res) => {
  const publishedPitch = await PitchService.publishPitch(req.pitch);
  res.status(200).json({ status: "success", data: publishedPitch });
});
