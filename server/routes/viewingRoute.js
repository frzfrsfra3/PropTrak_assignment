import express from 'express';
import {
  createViewing,
  getTenantViewings,
  getOwnerViewings,
  updateViewingStatus,
} from '../controllers/viewingController.js';

import authenticateUser from '../middleware/authenticate.js';

const router = express.Router();

router.post('/', authenticateUser, createViewing);
router.get('/tenant', authenticateUser, getTenantViewings);
router.get('/owner', authenticateUser, getOwnerViewings);
router.patch('/:id/status', authenticateUser, updateViewingStatus);

export default router;
