const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-11 pb-24">{children}</div>;
};

export default Layout;
