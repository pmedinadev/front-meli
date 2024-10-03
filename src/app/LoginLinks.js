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
                // src={user.image_url || '/profile_avatar_placeholder.png'}
                src="/profile_avatar_placeholder.png"
                width={22}
                height={22}
                alt={`@${user.name}'s profile picture`}
                className="user-image rounded-circle me-2"
              />
              <span>{user.name}</span>
            </DropdownToggle>
            <DropdownMenu as="ul" className="border-0 shadow-sm">
              <li>
                <DropdownItem as={Link} href="/profile">
                  My profile
                </DropdownItem>
              </li>
              <DropdownDivider />
              <li>
                <DropdownItem onClick={logout}>Log out</DropdownItem>
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
            Create account
          </Link>

          <Link
            href="/login"
            className="link-body-emphasis text-decoration-none">
            Log in
          </Link>
        </>
      )}
    </>
  )
}

export default LoginLinks
