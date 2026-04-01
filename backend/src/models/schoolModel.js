const db = require('../../db');

async function createSchool({ name, address, latitude, longitude }) {
  const [result] = await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
  return { id: result.insertId, name, address, latitude, longitude };
}

async function getAllSchools() {
  const [rows] = await db.execute('SELECT id, name, address, latitude, longitude FROM schools');
  return rows;
}

module.exports = {
  createSchool,
  getAllSchools,
};
