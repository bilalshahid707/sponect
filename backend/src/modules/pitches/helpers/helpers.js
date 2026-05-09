const { pitchTabs } = require("../../../utils/Constants");
const AppError = require("../../../utils/AppError");

// Validates tabNumber + tabName form a known pair. Returns the tab config.
exports.validateTabPair = (tabNumber, tabName) => {
  const num = Number(tabNumber);
  if (Number.isNaN(num) || !pitchTabs[num]) {
    throw new AppError("Invalid tabNumber", 400);
  }
  if (pitchTabs[num].name !== tabName) {
    throw new AppError(`Invalid tabName for tab ${num}. Expected: ${pitchTabs[num].name}`, 400);
  }
  return { number: num, ...pitchTabs[num] };
};

// For draft pitches: requestTabNumber must be <= pitch.tabNumber + 1 (no skipping, re-editing allowed).
// Published pitches skip this check entirely.
exports.validateTabSequence = (requestTabNumber, pitch) => {
  if (pitch.status !== "draft") return;
  if (requestTabNumber > Number(pitch.tabNumber) + 1) {
    const nextRequired = Number(pitch.tabNumber) + 1;
    const nextTab = pitchTabs[nextRequired];
    throw new AppError(
      `Complete tab ${nextRequired} (${nextTab?.name ?? nextRequired}) before accessing tab ${requestTabNumber}`,
      400,
    );
  }
};

// Filters payload to allowed fields and checks required fields are present.
exports.validateData = (tab, payload) => {
  const filtered = {};
  for (const key of Object.keys(payload)) {
    if (tab.fields.has(key)) filtered[key] = payload[key];
  }
  for (const attr of tab.required) {
    if (!(attr in filtered)) {
      throw new AppError(`Missing required field: ${attr}`, 400);
    }
  }
  return filtered;
};
