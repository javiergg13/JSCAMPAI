import { useRouter } from "../hooks/useRouter"

export function Route({ path, component }) {
  const { currentPath } = useRouter()
  const Component = component

  if (currentPath !== path) return null

  return <Component />
}
