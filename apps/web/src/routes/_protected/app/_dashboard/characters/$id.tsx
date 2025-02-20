import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/app/_dashboard/characters/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ strict: false });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', params.id],
    queryFn: async () => {
      const res = await apiClient.get(`/api/v1/characters/${params.id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
