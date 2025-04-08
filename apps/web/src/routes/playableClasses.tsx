import { createFileRoute } from '@tanstack/react-router'
import BlizzardPlayableClasses from '@/components/getBlizzardPlayableClasses'

export const Route = createFileRoute('/playableClasses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BlizzardPlayableClasses />
}
