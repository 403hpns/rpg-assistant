import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface CharacterCardProps {
  fullName: string;
  description?: string;
}

export function CharacterCard({ fullName, description }: CharacterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fullName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
