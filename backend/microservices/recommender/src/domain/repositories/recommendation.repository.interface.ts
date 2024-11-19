import { Recommendation } from "../models/recommendation.model";
import { Student } from "../models/student.model";

export interface IRecommendationRepository {
  create(recommendation: Recommendation): Promise<Recommendation>;
  //update(recommendation: Recommendation): Promise<void>;
  fetchByStudent(student: Student): Promise<Recommendation>;
  findById(id: number): Promise<Recommendation | null>;
  findLatestByStudent(student: Student): Promise<Recommendation | null>;
  //findAll(): Promise<Recommendation[]>;
  //findAllByStudentId(id: number): Promise<Recommendation[]>;
}
