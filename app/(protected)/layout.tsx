import Navbar from "./_components/navbar"

interface ProctectedLayoutProps {
  children: React.ReactNode
}

const ProctectedLayout = ({ children }: ProctectedLayoutProps) => {
  return (
    <div className="h-full  w-full flex flex-col items-center bg-sky-500 antialiased gap-y-10">
      <Navbar />
      {children}
    </div>
  )
}

export default ProctectedLayout
