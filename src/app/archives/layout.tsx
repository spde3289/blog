const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="pt-11 pb-12">{children}</div>;
};

export default Layout;
