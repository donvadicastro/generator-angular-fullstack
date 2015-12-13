'use strict';

import express from 'express';
import controller from './task.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/status', controller.status);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', auth.isAuthenticated(), controller.create);
router.put('/'/*, auth.isAuthenticated()*/, controller.reserve);

router.put('/:id'/*, auth.isAuthenticated()*/, controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
