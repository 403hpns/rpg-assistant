import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Stat {
  @Field()
  id: string;

  @Field()
  name: string;
}
