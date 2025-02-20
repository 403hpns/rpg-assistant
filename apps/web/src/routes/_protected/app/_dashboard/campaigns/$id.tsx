import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/app/_dashboard/campaigns/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ strict: false });

  return <div>Hello "/app/campaigns/{params.id}"!</div>;
}
