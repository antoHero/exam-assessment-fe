
import { useEffect } from 'react'

export const PageTitle = (title: string) => {

  useEffect(() => {
    document.title = title + ` - Quick Assessment`;
  }, [title]);
}
