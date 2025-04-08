// src/routes/classes.tsx - SHOULD LOOK LIKE THIS
import { createFileRoute } from '@tanstack/react-router'
// Make SURE this is the LIST component
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
