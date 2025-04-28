import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div>
      
        <Navbar />
        <main className="min-h-screen">{children}</main>

        <Footer />
     
      </div>
  )
}