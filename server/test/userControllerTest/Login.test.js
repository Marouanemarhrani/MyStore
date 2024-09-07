const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../../models/userModel');
const { loginController } = require('../../controllers/userController');
const { comparePassword, hashPassword } = require('../../helpers/authHelper');

// Charger les variables d'environnement
dotenv.config();

// Mock uniquement `comparePassword` et `JWT`, pas `hashPassword`
jest.mock('jsonwebtoken');
jest.mock('../../helpers/authHelper', () => ({
    comparePassword: jest.fn(),
    hashPassword: jest.requireActual('../../helpers/authHelper').hashPassword, // Utilise jest.requireActual pour garder hashPassword fonctionnel
}));

beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL || "mongodb+srv://storedb:123@cluster0.yuzsf2m.mongodb.net/";
    await mongoose.connect(mongoUrl);
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {
    // Supprime tous les utilisateurs avant chaque test pour éviter les doublons
    await userModel.deleteMany({});
});

describe('User Login', () => {
    it('should return an error if email is missing', async () => {
        const req = {
            body: {
                password: "password123"  // Email manquant
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);  // Vérifier que le code de statut est 400
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Email and password are required'
        });
    });

    it('should return an error if password is missing', async () => {
        const req = {
            body: {
                email: "john.doe@example.com"  // Mot de passe manquant
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);  // Vérifier que le code de statut est 400
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: 'Email and password are required'
        });
    });

    it('should return an error if user does not exist', async () => {
        const req = {
            body: {
                email: "unknown@example.com",
                password: "password123",
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: "User doesn't exist. Please register or try another email.",
        });
    });

    it('should return an error if the password is incorrect', async () => {
        const uniqueEmail = `john.doe.${Date.now()}@example.com`;  // Générer un email unique

        // Hacher le mot de passe avant d'insérer l'utilisateur
        const hashedPassword = await hashPassword("correct_password");
        console.log('Mot de passe haché:', hashedPassword);  // Vérification du hachage

        // Créez un utilisateur dans la base de données avec le mot de passe haché
        const user = await userModel.create({
            firstname: "John",
            lastname: "Doe",
            email: uniqueEmail,
            password: hashedPassword,  // Utilisation du mot de passe haché
            phone: "+1234567890",
            address: "123 Main St"
        });
        console.log('Utilisateur créé:', user);  // Vérification de la création de l'utilisateur

        // Mock de la comparaison de mot de passe (simuler un mot de passe incorrect)
        comparePassword.mockResolvedValue(false);

        const req = {
            body: {
                email: uniqueEmail,  // Assurez-vous d'utiliser le même email
                password: "wrongpassword",  // Mauvais mot de passe
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            message: "Incorrect password. Please try again.",
        });
    });

    it('should login the user successfully with valid credentials', async () => {
        const uniqueEmail = `john.doe.${Date.now()}@example.com`;  // Générer un email unique

        // Hacher le mot de passe avant d'insérer l'utilisateur
        const hashedPassword = await hashPassword("password123");
        console.log('Mot de passe haché:', hashedPassword);  // Vérification du hachage

        // Créer l'utilisateur dans la base de données avec le mot de passe haché
        const user = await userModel.create({
            firstname: "John",
            lastname: "Doe",
            email: uniqueEmail,
            password: hashedPassword,  // Utilisation du mot de passe haché
            phone: "+1234567890",
            address: "123 Main St"
        });
        console.log('Utilisateur créé:', user);  // Vérification de la création de l'utilisateur

        // Mock de la comparaison de mot de passe (mot de passe correct)
        comparePassword.mockResolvedValue(true);

        // Mock de JWT.sign
        JWT.sign.mockReturnValue("mocked_token");

        const req = {
            body: {
                email: uniqueEmail,
                password: "password123"
            }
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: "Login successful",
            user: expect.objectContaining({
                email: uniqueEmail,
            }),
            token: "mocked_token",
        }));
    });
});
