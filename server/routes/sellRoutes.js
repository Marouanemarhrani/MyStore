const express = require('express');
const formidable = require('express-formidable');
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');
const {
  sellController,
  createSellController,
  deleteSellController,
  getSellPhotourlController,
  singleSellController,
  updateSellController,
} = require('../controllers/sellController');

const router = express.Router();

// Middleware commun pour requireSignIn et isAdmin sur les routes de mise à jour et suppression
router.use(['/update/:id', '/delete/:id', '/list'], requireSignIn, isAdmin);

// Créer une vente (POST)
router.post('/create', formidable(), createSellController);

// Mettre à jour une vente (PUT)
router.put('/update/:id', formidable(), updateSellController);

// Obtenir toutes les ventes (GET)
router.get('/list', sellController);

// Obtenir une vente par ID (GET)
router.get('/single/:id', singleSellController);

// Supprimer une vente (DELETE)
router.delete('/delete/:id', deleteSellController);

// Obtenir l'URL de la photo d'une vente par ID (GET)
router.get('/photo-url/:id', getSellPhotourlController);

module.exports = router;
