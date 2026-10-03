import { Router } from 'express';
import { ProgramController } from './program.controller';

const router = Router();

router.post('/', ProgramController.createProgram);
router.get('/', ProgramController.getAllPrograms);

export const ProgramRoutes = router;
