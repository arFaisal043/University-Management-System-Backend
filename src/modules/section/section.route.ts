import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SectionController } from './section.controller';
import { createSectionValidationSchema } from './section.validation';

const router = Router();

router.post('/', validateRequest(createSectionValidationSchema), SectionController.createSection);
router.get('/', SectionController.getAllSections);

export const SectionRoutes = router;
