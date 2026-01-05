# Validation Architecture Overview

## Architecture Diagram

```
Request → Controller → Model.create()/update()
                          ↓
                    beforeValidate Hook
                          ↓
                    Validator Function
                    (Validators.js)
                          ↓
                    Throws ValidationError
                          ↓
                    Sequelize catches error
                          ↓
                    SequelizeValidationError
                          ↓
                    Error Middleware
                    (errorMiddleware.js)
                          ↓
                    Extract Message
                          ↓
                    AppError → Response (400)
```

## Validation Flow

### 1. Controller Layer
Controllers use `catchAsync()` wrapper to handle async errors:
```javascript
const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body); // Validation happens here
  // ... rest of logic
});
```

### 2. Model Layer
Each model has `beforeValidate` hook that calls validators:
```javascript
hooks: {
  async beforeValidate(sponsee) {
    validateEnumField(sponsee.gender, genders, "gender");
    validateArrayField(sponsee.occupation, occupations, "occupation");
    // ... more validations
  }
}
```

### 3. Validator Functions (Validators.js)
Validator functions throw `ValidationError` with descriptive messages:
```javascript
exports.validateEnumField = (value, allowedValues, fieldName) => {
  if (value && !allowedValues.includes(value)) {
    throw new ValidationError(`Invalid ${fieldName}. Allowed values: ${allowedValues.join(", ")}`);
  }
};
```

### 4. Error Handling
The `catchAsync()` wrapper catches all errors and passes to error middleware:
```javascript
module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Pass to middleware
};
```

### 5. Error Middleware
Detects validation errors and formats response:
```javascript
const errorMiddleware = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") 
    err = handleValidationError(err); // Extract custom message
  // ... send response
};
```

## Validator Functions Reference

### validateEnumField()
Validates a single field against allowed enum values
```javascript
validateEnumField(sponsor.gender, genders, "gender");
// Throws: "Invalid gender. Allowed values: male, female, non-binary, prefer_not_to_say"
```

### validateArrayField()
Validates array of values against allowed enum values
```javascript
validateArrayField(sponsee.occupation, occupations, "occupation");
// Throws: "Invalid occupation(s): xyz, abc. Allowed: engineering, marketing, ..."
```

### validatePolymorphicAssociation()
Ensures at least one of multiple IDs is present
```javascript
validatePolymorphicAssociation(social, ['sponseeId', 'sponsorId'], 'Social link');
// Throws: "Social link must be associated with sponseeId or sponsorId"
```

### validateRole()
Validates user role
```javascript
validateRole(user.role, ['sponsee', 'sponsor']);
// Throws: "Invalid role. Allowed values: sponsee, sponsor"
```

## Models Using Validation

| Model | Validations |
|-------|------------|
| **User** | role (enum) |
| **Sponsor** | gender (enum), ageGroup (enum), occupation (array) |
| **Sponsee** | gender (enum), ageGroup (enum), teamSize (enum), audienceReach (enum), occupation (array), activityTypes (array) |
| **Social** | name (enum), sponseeId/sponsorId (polymorphic) |

## Constants Reference
All enum values are centralized in `src/utils/Constants.js`:
- `userRoles`: ["sponsee", "sponsor"]
- `genders`: ["male", "female", "non-binary", "prefer_not_to_say"]
- `ageGroups`: [age range values]
- `teamSizes`: ["1", "2-5", "6-10", "10+"]
- `audienceRanges`: [follower ranges]
- `occupations`: [list of occupations]
- `activityTypes`: [activity types]
- `socials`: [social media platforms]

## Error Response Format
When validation fails:
```json
{
  "status": "fail",
  "message": "Invalid gender. Allowed values: male, female, non-binary, prefer_not_to_say"
}
```

Status code: **400 Bad Request**

## Best Practices
1. ✅ Always use appropriate validator for the field type
2. ✅ Import validators in model files
3. ✅ Call validators in `beforeValidate` hooks
4. ✅ Add descriptive field names for clear error messages
5. ✅ Keep enum constants in Constants.js for reusability
6. ✅ Test validation with invalid values before deployment

## Adding New Validators
To add a new validator:
1. Add function to `src/utils/Validators.js`
2. Export the function
3. Import in the model file
4. Call in the `beforeValidate` hook

Example:
```javascript
// In Validators.js
exports.validateCustomField = (value, rule, fieldName) => {
  if (!rule(value)) {
    throw new ValidationError(`Invalid ${fieldName}`);
  }
};

// In Model
const { validateCustomField } = require("../utils/Validators");
hooks: {
  async beforeValidate(obj) {
    validateCustomField(obj.field, (v) => v > 0, "field");
  }
}
```
