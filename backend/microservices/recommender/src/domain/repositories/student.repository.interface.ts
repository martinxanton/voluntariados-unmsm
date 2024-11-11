import { Student } from '../models/student.model';

export interface IStudentRepository {
  findById(id: number): Promise<Student | null>;
}
