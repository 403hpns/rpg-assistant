import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/welcome/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/welcome/"!</div>
}
