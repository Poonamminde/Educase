const { addSchoolSchema, listSchoolsSchema } = require('../validators/schoolValidator');
const { addSchool, listSchools } = require('../services/schoolService');

async function addSchoolHandler(req, res) {
  const { error, value } = addSchoolSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const school = await addSchool(value);
    return res.status(201).json({ success: true, school });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
}

async function listSchoolsHandler(req, res) {
  const { error, value } = listSchoolsSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const schools = await listSchools(value.latitude, value.longitude);
    return res.json({ success: true, schools });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
}

module.exports = {
  addSchoolHandler,
  listSchoolsHandler,
};