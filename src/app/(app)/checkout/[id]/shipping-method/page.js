import ShippingMethod from './ShippingMethod'

export const metadata = {
  title: 'Elige el domicilio',
}

export default function ShippingMethodPage({ params }) {
  return <ShippingMethod id={params.id} />
}
