import { useCallback } from 'react'
import { useRuntime } from 'vtex.render-runtime'

interface UseRedirect {
  goToListPage: () => void
  goToRegisterPage: () => void
  goToEditPage: (id: string) => void
}

export const useRedirect = (): UseRedirect => {
  const { navigate } = useRuntime()

  const goToListPage = useCallback(() => {
    navigate({
      page: 'admin.app.assembly-options-list',
    })
  }, [navigate])

  const goToRegisterPage = useCallback(() => {
    navigate({
      page: 'admin.app.assembly-options-register',
    })
  }, [navigate])

  const goToEditPage = useCallback(
    (id: string) => {
      navigate({
        page: 'admin.app.assembly-options-edit',
        params: {
          assemblyOptionId: id,
        },
      })
    },
    [navigate]
  )

  return {
    goToListPage,
    goToRegisterPage,
    goToEditPage,
  }
}
