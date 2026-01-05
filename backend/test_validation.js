const { sequelize } = require('./src/config/sequelize');
const User = require('./src/models/user.model');
const Social = require('./src/models/social.model');
const Sponsor = require('./src/models/sponsor.model');
const Sponsee = require('./src/models/sponsee.model');

async function testValidation() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    // Test 1: User with invalid role
    console.log('\n=== Test 1: User with invalid role ===');
    try {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'invalid_role'
      });
      console.log('ERROR: Should have thrown validation error');
    } catch (err) {
      console.log('✓ Caught error:', err.name);
      console.log('  Message:', err.message);
      if (err.errors) {
        console.log('  Details:', err.errors[0].message);
      }
    }

    // Test 2: Sponsor with invalid gender
    console.log('\n=== Test 2: Sponsor with invalid gender ===');
    try {
      // First create a user
      const user = await User.create({
        username: 'testuser2',
        email: 'test2@example.com',
        password: 'password123',
        role: 'sponsor'
      });

      // Then create sponsor with invalid gender
      await Sponsor.create({
        userId: user.id,
        gender: 'invalid_gender'
      });
      console.log('ERROR: Should have thrown validation error');
    } catch (err) {
      console.log('✓ Caught error:', err.name);
      console.log('  Message:', err.message);
      if (err.errors) {
        console.log('  Details:', err.errors[0].message);
      }
    }

    // Test 3: Social with missing association
    console.log('\n=== Test 3: Social without sponsee or sponsor ===');
    try {
      await Social.create({
        name: 'instagram',
        URL: 'https://instagram.com/test'
      });
      console.log('ERROR: Should have thrown validation error');
    } catch (err) {
      console.log('✓ Caught error:', err.name);
      console.log('  Message:', err.message);
      if (err.errors) {
        console.log('  Details:', err.errors[0].message);
      }
    }

    console.log('\n✓ Validation tests completed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

testValidation();
