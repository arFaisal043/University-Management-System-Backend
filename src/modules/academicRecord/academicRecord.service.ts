import { PrismaClient } from '@prisma/client';
import AppError from '../../errors/AppError';
const prisma = new PrismaClient();

const createAttendance = async (payload: any) => {
  return await prisma.attendance.create({ data: payload });
};

const createExam = async (payload: any) => {
  return await prisma.exam.create({ data: payload });
};

const submitResult = async (payload: any) => {
  const exam = await prisma.exam.findUnique({ where: { id: payload.examId } });
  if (!exam) throw new AppError(404, 'Exam not found');
  if (payload.marksObtained > exam.totalMarks) {
    throw new AppError(400, 'Marks obtained cannot exceed total marks');
  }

  return await prisma.result.create({ data: payload });
};

const generateTranscript = async (studentId: string) => {
  // Fetch all results for a student
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      results: {
        include: {
          exam: {
            include: { section: { include: { course: true } } }
          }
        }
      }
    }
  });

  if (!student) throw new AppError(404, 'Student not found');

  let totalPoints = 0;
  let totalCredits = 0; // Assume each course is 3 credits for simplicity
  const defaultCredit = 3;

  const records = student.results.map((result) => {
    const percentage = (result.marksObtained / result.exam.totalMarks) * 100;
    
    // Simple GPA scale map
    let gpa = 0.0;
    if (percentage >= 80) gpa = 4.0;
    else if (percentage >= 75) gpa = 3.75;
    else if (percentage >= 70) gpa = 3.5;
    else if (percentage >= 65) gpa = 3.25;
    else if (percentage >= 60) gpa = 3.0;
    else if (percentage >= 50) gpa = 2.5;
    else if (percentage >= 40) gpa = 2.0;

    totalPoints += (gpa * defaultCredit);
    totalCredits += defaultCredit;

    return {
      courseName: result.exam.section.course.name,
      courseCode: result.exam.section.course.code,
      examName: result.exam.name,
      marks: result.marksObtained,
      totalMarks: result.exam.totalMarks,
      gpa,
    };
  });

  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return {
    studentName: student.name,
    studentId: student.id,
    records,
    cgpa: parseFloat(cgpa),
  };
};

export const AcademicRecordService = {
  createAttendance,
  createExam,
  submitResult,
  generateTranscript,
};
