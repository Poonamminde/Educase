const { createSchool, getAllSchools } = require('../models/schoolModel');

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function addSchool(data) {
  const school = await createSchool(data);
  return school;
}

async function listSchools(userLatitude, userLongitude) {
  const schools = await getAllSchools();
  return schools
    .map((school) => ({
      ...school,
      distanceKm: haversineDistance(
        userLatitude,
        userLongitude,
        parseFloat(school.latitude),
        parseFloat(school.longitude)
      ),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

module.exports = {
  addSchool,
  listSchools,
};
