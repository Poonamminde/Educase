const request = require('supertest');
const express = require('express');
const schoolRoutes = require('../../src/routes/schoolRoutes');
const pool = require('../../db');

const app = express();
app.use(express.json());
app.use('/api', schoolRoutes);

jest.mock('../../db', () => ({
  execute: jest.fn(),
}));

describe('School Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/addSchool', () => {
    it('should add a school with valid data', async () => {
      const schoolData = {
        name: 'Test School',
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.006,
      };

      pool.execute.mockResolvedValueOnce([{ insertId: 1 }]);

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.school).toBeDefined();
      expect(response.body.school.id).toBe(1);
      expect(response.body.school.name).toBe('Test School');
    });

    it('should return 400 for missing name', async () => {
      const schoolData = {
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.006,
      };

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('name');
    });

    it('should return 400 for missing address', async () => {
      const schoolData = {
        name: 'Test School',
        latitude: 40.7128,
        longitude: -74.006,
      };

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('address');
    });

    it('should return 400 for invalid latitude (> 90)', async () => {
      const schoolData = {
        name: 'Test School',
        address: '123 Main St',
        latitude: 100,
        longitude: -74.006,
      };

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid longitude (> 180)', async () => {
      const schoolData = {
        name: 'Test School',
        address: '123 Main St',
        latitude: 40.7128,
        longitude: 200,
      };

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for empty name', async () => {
      const schoolData = {
        name: '',
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.006,
      };

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should handle database errors', async () => {
      const schoolData = {
        name: 'Test School',
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.006,
      };

      pool.execute.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).post('/api/addSchool').send(schoolData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('GET /api/listSchools', () => {
    it('should list schools sorted by distance', async () => {
      const mockSchools = [
        { id: 1, name: 'School A', address: 'Address A', latitude: 40.7128, longitude: -74.006 },
        { id: 2, name: 'School B', address: 'Address B', latitude: 40.758, longitude: -73.9855 },
      ];

      pool.execute.mockResolvedValueOnce([mockSchools]);

      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 40.7128, longitude: -74.006 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.schools).toBeDefined();
      expect(Array.isArray(response.body.schools)).toBe(true);
      expect(response.body.schools[0].distanceKm).toBeLessThanOrEqual(
        response.body.schools[1].distanceKm
      );
    });

    it('should return 400 for missing latitude', async () => {
      const response = await request(app)
        .get('/api/listSchools')
        .query({ longitude: -74.006 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('latitude');
    });

    it('should return 400 for missing longitude', async () => {
      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 40.7128 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('longitude');
    });

    it('should return 400 for invalid latitude (> 90)', async () => {
      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 100, longitude: -74.006 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 for invalid longitude (> 180)', async () => {
      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 40.7128, longitude: 200 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should handle database errors', async () => {
      pool.execute.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 40.7128, longitude: -74.006 });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Database error');
    });

    it('should return empty array when no schools exist', async () => {
      pool.execute.mockResolvedValueOnce([[]]);

      const response = await request(app)
        .get('/api/listSchools')
        .query({ latitude: 40.7128, longitude: -74.006 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.schools).toEqual([]);
    });
  });
});
