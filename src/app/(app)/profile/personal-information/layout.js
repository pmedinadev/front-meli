import BreadcrumbProfile from "@/components/BreadcrumbProfile"

export const metadata = {
  title: 'Personal information',
}

export default function PersonalInformationLayout({ children }) {
  return (
    <>
      <BreadcrumbProfile />
      {children}
    </>
  )
}
