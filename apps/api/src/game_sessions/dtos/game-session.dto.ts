import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/users/dtos/user.dto';

@ObjectType()
export class GameSessionDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  campaignId: number;

  @Field(() => UserDto)
  owner: UserDto;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
