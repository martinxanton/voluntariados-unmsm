import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Recommendation {
  @Field((type) => ID)
  id: number;

  @Field()
  student_id: number;

  @Field()
  top10_program_ids: number[];
}
