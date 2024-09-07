const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userModel = require('../../models/userModel');
const { registerController } = require('../../controllers/userController');
const { hashPassword } = require('../../helpers/authHelper');

// Charger les variables d'environnement
dotenv.config();

beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || "mongodb+srv://storedb:123@cluster0.yuzsf2m.mongodb.net/";
    await mongoose.connect(mongoUrl);
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {
    await userModel.deleteMany({});  // Vider la collection avant chaque test pour éviter les doublons
});

describe('User Registration', () => {
    it('should return an error if email is missing', async () => {
        const req = {
            body: {
                firstname: "John",
                lastname: "Doe",
                password: "password123",  // Email manquant
                phone: "+1234567890",
                address: "123 Main St"
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await registerController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,  // Ajout de cette ligne pour correspondre à la réponse
            message: 'Email is required for authentication!'
        });
    });

    it('should return an error if password is missing', async () => {
        const req = {
            body: {
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@example.com",
                phone: "+1234567890",
                address: "123 Main St"
                // Mot de passe manquant
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await registerController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,  // Ajout de cette ligne pour correspondre à la réponse
            message: 'Password is required for authentication!'
        });
    });

    it('should register a new user successfully', async () => {
        const uniqueEmail = `john.doe.${Date.now()}@example.com`;  // Générer un email unique

        const req = {
            body: {
                firstname: "John",
                lastname: "Doe",
                email: uniqueEmail,  // Utilisation d'un email unique pour éviter la duplication
                password: "password123",
                phone: "+1234567890",
                address: "123 Main St"
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await registerController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);  // Utiliser le code de statut correct pour la création
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: "Account added successfully"
        }));
    });

    it('should return an error if email already exists', async () => {
        const uniqueEmail = `john.doe.${Date.now()}@example.com`;  // Générer un email unique

        // Hacher le mot de passe avant d'insérer l'utilisateur
        const hashedPassword = await hashPassword("password123");

        // Créez un utilisateur initial avec l'email en question
        await userModel.create({
            firstname: "John",
            lastname: "Doe",
            email: uniqueEmail,
            password: hashedPassword,  // Utilisation du mot de passe haché
            phone: "+1234567890",
            address: "123 Main St"
        });

        const req = {
            body: {
                firstname: "John",
                lastname: "Doe",
                email: uniqueEmail,  // Même email pour provoquer l'erreur de duplication
                password: "password123",  // Mot de passe brut ici (il sera haché dans le contrôleur)
                phone: "+1234567890",
                address: "123 Main St"
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await registerController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);  // Le contrôleur retourne 200 en cas d'email dupliqué
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: "An account is already registered with this email. Login or try another email"
        });
    });
});
