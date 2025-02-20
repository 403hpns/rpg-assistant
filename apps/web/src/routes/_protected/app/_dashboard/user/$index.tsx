import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/app/_dashboard/user/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/user/$index"!</div>
}
