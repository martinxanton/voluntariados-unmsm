import { Inject, Injectable } from '@nestjs/common';
import { IStudentRepository } from '../repositories/student.repository.interface';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  constructor(
    @Inject('IStudentRepository')
    private readonly studentRepository: IStudentRepository,
  ) {}
  async getStudentById(id: number): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }
}
