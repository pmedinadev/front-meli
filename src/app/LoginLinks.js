'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'
import Image from 'next/image'

const LoginLinks = () => {
  const { user, logout } = useAuth({ middleware: 'guest' })

  return (
    <>
      {user ? (
        <>
          <Dropdown className="text-end ms-auto">
            <DropdownToggle
              variant="link"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="link-body-emphasis text-decoration-none p-0">
              <Image
                src={user?.avatar || '/profile_avatar_placeholder.png'}
                width={22}
                height={22}
                alt={`@${user.name}'s profile picture`}
                className="user-image rounded-circle"
              />
              <span className="ms-2">{user?.display_name}</span>
            </DropdownToggle>
            <DropdownMenu as="ul" className="border-0 shadow-sm">
              <li>
                <DropdownItem as={Link} href="/profile">
                  Mi perfil
                </DropdownItem>
              </li>
              <DropdownDivider />
              <li>
                <DropdownItem onClick={logout}>Salir</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
          <Button
            variant="link"
            size="lg"
            as={Link}
            href="/"
            className="link-body-emphasis ms-3 p-0">
            <i className="bi bi-bell" />
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/register"
            className="link-body-emphasis text-decoration-none me-3">
            Crea tu cuenta
          </Link>

          <Link
            href="/login"
            className="link-body-emphasis text-decoration-none">
            Ingresa
          </Link>
        </>
      )}
    </>
  )
}

export default LoginLinks
