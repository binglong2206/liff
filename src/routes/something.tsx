import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/something')({
  component: Something,
  beforeLoad: () => {
    throw redirect({
      to: '/',
    })
  },
})

function Something() {
  return null
} 