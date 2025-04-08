import { createFileRoute } from '@tanstack/react-router'
import BlizzardPlayableClassesList from '@/components/getBlizzardPlayableClasses' // Or correct path/name

export const Route = createFileRoute('/classes')({
  component: ClassesListComponent, // Use this component
})

function ClassesListComponent() { // Renamed for clarity
  return (
    <div>
      {/* Renders the component that shows the list */}
      <BlizzardPlayableClassesList />
    </div>
  )
}
