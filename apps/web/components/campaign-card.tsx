import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Edit, Trash2 } from "lucide-react";

interface CampaignCardProps {
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onStart?: () => void;
}

export function CampaignCard({
  title,
  description,
  onEdit,
  onDelete,
  onStart,
}: CampaignCardProps) {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onStart} className="w-full gap-2">
          <PlayCircle className="h-4 w-4" />
          Rozpocznij sesję
        </Button>
      </CardContent>
    </Card>
  );
}
