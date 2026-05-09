exports.socials = [
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "threads",
  "tiktok",
  "x",
  "website",
];

exports.genders = ["male", "female", "both"];

exports.ageGroups = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
];

exports.teamSizes = ["1", "2-10", "11-50", "51-200", "200+"];

exports.AllowedSponsorFields = new Set([
  "name",
  "tagline",
  "description",
  "location",
  "industry",
  "founded",
  "minBudget",
  "maxBudget",
  "cashSponsorship",
  "inkindSponsorship",
  "shortDuration",
  "longDuration",
  "oneTimeDuration",
  "gender",
  "ageGroup",
  "website",
  "facebook",
  "instagram",
  "linkedin",
  "x",
  "active",
  "occupation",
  "categories",
  "totalSponsorships",
  "totalInvestment"
]);

exports.AllowedSponseeFields = new Set([
  "name",
  "tagline",
  "description",
  "location",
  "founded",
  "logoURL",
  "logoPublicID",
  "coverURL",
  "coverPublicID",
  "gender",
  "ageGroup",
  "occupation",
  "totalCollaborations",
  "teamSize",
  "audienceReach",
  "activityTypes",
]);

exports.occupations = [
  "working professionals",
  "students",
  "job seekers",
  "employee",
  "business owners",
  "teachers",
  "healthcare professionals",
  "other",
];

exports.activityTypes = [
  "events",
  "workshops",
  "seminars",
  "conferences",
  "campaigns",
  "competitions",
  "training programs",
  "webinars",
  "community drives",
  "other",
];

exports.pitchCategories = [
  "event",
  "workshop",
  "seminar",
  "conference",
  "campaign",
  "competition",
  "training program",
  "webinar",
  "community drive",
  "other",
];

exports.AllowedPitchFields = new Set([
  "title",
  "description",
  "expectedAudience",
  "venue",
  "startAt",
  "endAt",
  "category",
  "gender",
  "ageGroup",
  "occupation",
  "opportunities",
  "promotionChannels",
  "previousSponsors",
  "currentSponsors",
  "preferences"
]);

exports.assetTypes = ["cover", "general", "document"]

exports.excludedQueryAttributes = new Set(['order','page','limit','offset'])

exports.pitchFilterFields = new Set(["expectedAudience","venue","category","gender","preferences","occupation"])

// Tab 0 = create. Tabs 1-4 = edit steps (5 total including create).
// Tab 1 covers basics + audience (merged). coverPhoto moved to assets.
exports.pitchTabs = {
  0: {
    name: "create",
    fields: new Set(["title", "venue", "startAt", "endAt", "category"]),
    required: new Set(["title", "venue", "startAt", "endAt"]),
  },
  1: {
    name: "details",
    fields: new Set(["description", "expectedAudience", "gender", "ageGroup", "occupation"]),
    required: new Set(["description", "expectedAudience", "gender", "ageGroup", "occupation"]),
  },
  2: {
    name: "promotion",
    fields: new Set(["opportunities", "promotionChannels", "preferences"]),
    required: new Set([]),
  },
  3: {
    name: "packages",
    fields: new Set([]),
    required: new Set([]),
  },
  4: {
    name: "media",
    fields: new Set([]),
    required: new Set([]),
  },
}


exports.sponsorListingFields = [
  "logo",
  "name",
  "tagline",
  "industry",
  "location",
  "minBudget",
  "maxBudget",
  "cashSponsorship",
  "inkindSponsorship",
  "shortDuration",
  "longDuration",
  "oneTimeDuration",
  "categories",
  "gender",
  "ageGroup",
  "totalSponsorships",
  "totalInvestment",
  "id"
];