const AuthLayout = ({ children }: any) => {
  return (
    <div>
      <nav className="bg-red-500">Login Nav Bar</nav>
      {children}
    </div>
  )
}

export default AuthLayout
