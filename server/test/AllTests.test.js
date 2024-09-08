const request = require('supertest');
const app = require('../server'); // Path to your server.js
const mongoose = require('mongoose');
const Company = require('../models/companyModel'); // Path to your company model
const Category = require('../models/categoryModel'); // Path to your category model
const Brand = require('../models/brandModel'); // Path to your brand model
const User = require('../models/userModel'); // Path to your user model
const { hashPassword } = require('../helpers/authHelper'); // Assuming this is where your hashPassword function is

process.env.NODE_ENV = 'test'; // Set test environment

describe('Combined Controller Tests', () => {
  let categoryId, companyId, token;

  // Before each test in the file, clear collections and set up base data
  beforeEach(async () => {
    await Company.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    await Brand.deleteMany({});

    // Insert a category for testing
    const category = new Category({ name: 'Tech', slug: 'tech' });
    const savedCategory = await category.save();
    categoryId = savedCategory._id;

    console.log('Inserted category:', savedCategory);

    // Insert a company for testing
    const company = new Company({ name: 'Apple', slug: 'apple', category: categoryId });
    const savedCompany = await company.save();
    companyId = savedCompany._id;

    console.log('Inserted company:', savedCompany);

    // Insert some brands
    const brands = [
      { name: 'iPhone', slug: 'iphone', company: companyId, category: categoryId },
      { name: 'MacBook', slug: 'macbook', company: companyId, category: categoryId }
    ];
    await Brand.insertMany(brands);

    // Create a test admin user for login
    const hashedPassword = await hashPassword('admin123');
    const adminUser = new User({
      firstname: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '+1234567890',
      address: '123 Admin Street',
      role: 1, // Admin role
    });
    const savedAdmin = await adminUser.save();

    // Login to get the token for authentication
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('User Registration', () => {
    it('should register a new user when all data is correct', async () => {
      const userData = {
        firstname: 'Marouane',
        lastname: 'Marhrani',
        email: 'marhrani@example.com',
        password: 'password123',
        phone: '+1234567890',
        address: '123 Test Street',
      };

      const res = await request(app)
        .post('/api/users/register')
        .send(userData); // Sending correct data

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Account added successfully');
      expect(res.body.user).toHaveProperty('_id');
      expect(res.body.user.firstname).toBe(userData.firstname);
      expect(res.body.user.lastname).toBe(userData.lastname);
      expect(res.body.user.email).toBe(userData.email);
    });
  });

  describe('User Login', () => {
    it('should login successfully with correct email and password', async () => {
      const loginData = {
        email: 'admin@example.com',
        password: 'admin123',
      };

      const res = await request(app)
        .post('/api/users/login')
        .send(loginData); // Sending correct data

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.user).toHaveProperty('_id');
      expect(res.body.user.email).toBe(loginData.email);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('Category Controller', () => {
    it('should get all categories successfully', async () => {
      const categories = [
        { name: 'Phones', slug: 'phones' },
        { name: 'Laptops', slug: 'laptops' },
        { name: 'Tablets', slug: 'tablets' },
      ];

      const insertedCategories = await Category.insertMany(categories);
      console.log('Inserted categories:', insertedCategories);

      const res = await request(app).get('/api/categories/get-category');

      console.log('Categories returned from API:', res.body.categories);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('All Categories List');
      expect(res.body.categories.length).toBe(3); // Expecting 4 categories
      expect(res.body.categories[0]).toHaveProperty('name');
      expect(res.body.categories[0]).toHaveProperty('slug');
    });
  });

  describe('Company Controller', () => {
    it('should get all companies successfully and populate categories', async () => {
      const res = await request(app).get('/api/companies/get-company');

      console.log('Companies returned from API:', res.body.companies);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('All Companies List');
      expect(res.body.companies.length).toBe(1); // Expecting 1 company
      expect(res.body.companies[0]).toHaveProperty('name');
      expect(res.body.companies[0]).toHaveProperty('slug');
      expect(res.body.companies[0].category).not.toBeNull();
      expect(res.body.companies[0].category.name).toBe('Tech'); // Ensure category is populated
    });
  });

  // Get all brands test
  describe('Brand Controller', () => {
    it('should get all brands successfully and populate company and category', async () => {
      const res = await request(app).get('/api/brands/get-brand');

      console.log('Brands returned from API:', res.body.brands);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('All Brands List');
      expect(res.body.brands.length).toBe(2); // Expecting 2 brands
      expect(res.body.brands[0]).toHaveProperty('name');
      expect(res.body.brands[0]).toHaveProperty('slug');
      expect(res.body.brands[0].company).not.toBeNull();
      expect(res.body.brands[0].company.name).toBe('Apple');
      expect(res.body.brands[0].category).not.toBeNull();
      expect(res.body.brands[0].category.name).toBe('Tech'); // Ensure category is populated
    });
  });
});
