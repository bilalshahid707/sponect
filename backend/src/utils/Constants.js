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

exports.excludedQueryAttributes = new Set(['order','page','limit','offset'])

exports.pitchFilterFields = new Set(["expectedAudience","venue","category","gender","preferences","occupation"])