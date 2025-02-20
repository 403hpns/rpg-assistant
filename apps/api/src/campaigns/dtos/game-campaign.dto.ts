import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameCampaignDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  ownerId: number;
}
