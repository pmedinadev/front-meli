'use client'

import LoginLinks from '@/app/LoginLinks'
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/useCart'
import { useCategories } from '@/hooks/useCategories'
import { useSearch } from '@/hooks/useSearch'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  DropdownDivider,
  DropdownItem,
  FormControl,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
  NavLink,
  Row,
} from 'react-bootstrap'

export default function Navigation() {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { categories, loading, error } = useCategories()
  const { getCartProducts } = useCart()
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    handleSearch,
    getSearchHistory,
    addToSearchHistory,
  } = useSearch()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const fetchCartCount = async () => {
    if (user?.cart_id) {
      const cartItems = await getCartProducts(user.cart_id)
      const totalUnits =
        cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
      setCartCount(totalUnits)
    }
  }

  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      setSearchTerm('')
      setShowSuggestions(false)
    }
  }, [pathname])

  useEffect(() => {
    fetchCartCount()

    window.addEventListener('cartUpdate', fetchCartCount)

    return () => {
      window.removeEventListener('cartUpdate', fetchCartCount)
    }
  }, [user])

  return (
    <Navbar expand="lg" className="bg-primary-meli">
      <Container className="flex-column">
        <Row className="w-100 g-0 mb-1">
          <Col xs="2">
            <Link href="/">
              <NavbarBrand>
                <Image
                  src="/logo_large.png"
                  width={159}
                  height={40}
                  alt="Mercado Libre México - Donde comprar y vender de todo"
                  priority
                />
              </NavbarBrand>
            </Link>
          </Col>
          <Col xs="6">
            <div className="position-relative">
              <form onSubmit={handleSearch}>
                <FormControl
                  type="search"
                  name="q"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="Buscar productos, marcas y más…"
                  autoComplete='false'
                  className="border-light rounded-1 shadow-sm pe-5"
                />
                <div className="vr position-absolute top-50 end-0 translate-middle-y me-5" />
                <button
                  type="submit"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-1">
                  <i className="bi bi-search text-muted" />
                </button>
              </form>

              {showSuggestions &&
                (searchTerm || getSearchHistory().length > 0) && (
                  <div
                    className="position-absolute w-100 bg-white rounded-bottom shadow-sm py-2"
                    style={{ zIndex: 1050 }}>
                    {searchTerm
                      ? suggestions.map(product => (
                          <Link
                            key={product.id}
                            href={`/p/MLP${product.id}`}
                            className="d-block py-2 px-3 text-decoration-none text-black hover-bg-primary">
                            <i className="bi bi-search me-3 opacity-50" />
                            {product.title}
                          </Link>
                        ))
                      : getSearchHistory().map((term, index) => (
                          <div
                            key={index}
                            className="py-2 px-3 hover-bg-primary"
                            onClick={() => {
                              setSearchTerm(term)
                              addToSearchHistory(term)
                              router.push(
                                `/search?q=${encodeURIComponent(term)}`,
                              )
                            }}>
                            <i className="bi bi-clock me-3 opacity-50" />
                            <span className="user-select-none">{term}</span>
                          </div>
                        ))}
                  </div>
                )}
            </div>
          </Col>
          <Col xs="4">
            <div className="text-end ms-auto">
              <Image
                src="/meli_plus_header.webp"
                width={340}
                height={39}
                alt="SUSCRÍBETE A MELI+ TOTAL POR 65 PESOS"
              />
            </div>
          </Col>
        </Row>

        <Row className="w-100 g-0 align-items-center">
          <Col xs="2">
            <div className="d-inline-flex rounded zipcode-button px-1">
              <i className="bi bi-geo-alt fs-4 me-1" />
              <div className="d-flex flex-column">
                <span style={{ fontSize: '11px' }} className="text-muted">
                  Ingresa tu
                </span>
                <span style={{ fontSize: '13px' }}>código postal</span>
              </div>
            </div>
          </Col>
          <Col xs="6">
            <NavbarToggle
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
            />
            <NavbarCollapse id="navbarSupportedContent">
              <small>
                <Nav as="nav" className="me-auto mb-2 mb-lg-0">
                  <NavDropdown
                    title="Categorías"
                    className="link-body-emphasis border-0">
                    {loading && <DropdownItem>Cargando...</DropdownItem>}
                    {error && (
                      <DropdownItem>Error cargando categorías</DropdownItem>
                    )}
                    {categories &&
                      categories.slice(0, 10).map(category => (
                        <DropdownItem
                          key={category.id}
                          as={Link}
                          href={`/category/${category.id}`}>
                          {category.name}
                        </DropdownItem>
                      ))}
                    <DropdownDivider />
                    <DropdownItem as={Link} href="/categories">
                      Ver más categorías
                    </DropdownItem>
                  </NavDropdown>
                  <NavLink as={Link} href="/publish">
                    Vender
                  </NavLink>
                  <NavLink as={Link} href="/">
                    Ayuda
                  </NavLink>
                </Nav>
              </small>
            </NavbarCollapse>
          </Col>
          <Col xs="4" className="d-flex align-items-center">
            <LoginLinks />
            <div className="position-relative">
              <Button
                variant="link"
                size="lg"
                as={Link}
                title="Carrito"
                href="/cart"
                className="link-body-emphasis ms-3 p-0">
                <i className="bi bi-cart" />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.65rem' }}>
                    {cartCount > 9 ? '+9' : cartCount}
                  </span>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}
