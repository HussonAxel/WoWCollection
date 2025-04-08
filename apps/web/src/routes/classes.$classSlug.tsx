import { createFileRoute } from '@tanstack/react-router'
import BlizzardPlayableClassesDetails from '@/components/getBlizzardPlayableClassDetails' // Or correct path/name

export const Route = createFileRoute('/classes/$classSlug')({
  component: ClassDetailComponent, 
})

function ClassDetailComponent() {
  return (
    <div className="mt-4">
      <BlizzardPlayableClassesDetails />
    </div>
  )
}
