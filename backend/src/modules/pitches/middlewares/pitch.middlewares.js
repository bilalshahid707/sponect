const catchAsync = require("../../../utils/CatchAsync");
const AppError = require("../../../utils/AppError");
const Pitch = require("../models/pitch.model");
const { validateTabPair, validateTabSequence } = require("../helpers/helpers");

// Loads pitch, verifies ownership, attaches req.pitch for downstream use.
exports.authorizeUserToModify = catchAsync(async (req, res, next) => {
  const { pitchId } = req.params;
  const { id: sponseeId } = req.sponsee;
  console.log(pitchId)
  const pitch = await Pitch.findByPk(pitchId);
  console.log(pitch)
  if (!pitch) return next(new AppError("Pitch not found", 404));
  if (Number(pitch.sponseeId) !== Number(sponseeId)) {
    return next(new AppError("Unauthorized", 403));
  }

  req.pitch = pitch;
  next();
});

// Factory — pass the tab numbers this route accepts.
// Reads tabNumber + tabName from req.query, validates the pair, attaches req.tab.
// Usage: validateTab([0, 1, 2, 3])  or  validateTab([4])
exports.validateTab = (allowedTabs) => (req, res, next) => {
  const { tabNumber, tabName } = req.query;

  if (tabNumber === undefined || tabName === undefined) {
    return next(new AppError("Missing query parameters: tabNumber and tabName", 400));
  }

  let tab;
  try {
    tab = validateTabPair(tabNumber, tabName);
  } catch (err) {
    return next(err);
  }

  if (!allowedTabs.includes(tab.number)) {
    return next(new AppError(`Tab ${tab.number} is not allowed on this route`, 400));
  }

  req.tab = tab;
  next();
};

// Enforces sequential tab progression for draft pitches.
// Must run after authorizeUserToModify (needs req.pitch) and validateTab (needs req.tab).
exports.checkTabSequence = (req, res, next) => {
  try {
    validateTabSequence(req.tab.number, req.pitch);
  } catch (err) {
    return next(err);
  }
  next();
};
