import Navbar from "../components/layout/user/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
