import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { ProgramRoutes } from '../modules/program/program.route';
import { CourseRoutes } from '../modules/course/course.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { SectionRoutes } from '../modules/section/section.route';
import { CourseRegistrationRoutes } from '../modules/courseRegistration/courseRegistration.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { AcademicRecordRoutes } from '../modules/academicRecord/academicRecord.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
  {
    path: '/programs',
    route: ProgramRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/sections',
    route: SectionRoutes,
  },
  {
    path: '/course-registrations',
    route: CourseRegistrationRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/academic-records',
    route: AcademicRecordRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
