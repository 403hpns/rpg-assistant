import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateGameCampaignDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerId: number;
}
