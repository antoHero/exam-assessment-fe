
import { Navigate, useLocation } from 'react-router-dom'
import { Main } from './Main'

type Props = object

export const Layout: React.FC<Props> = () => {

  const location = useLocation()

  if (location.pathname === '/') {
    return <Navigate replace to={'/'} />
  }

  return (
    <>
      <Main />
    </>
  )
}
