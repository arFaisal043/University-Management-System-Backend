import { Router } from 'express';
import { DepartmentController } from './department.controller';

const router = Router();

router.post('/', DepartmentController.createDepartment);
router.get('/', DepartmentController.getAllDepartments);

export const DepartmentRoutes = router;
