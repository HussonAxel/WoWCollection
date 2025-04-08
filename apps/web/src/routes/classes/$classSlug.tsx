import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classes/$classSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><p>Je suis un test</p></div>
}
