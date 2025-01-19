const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-5 sm:mt-11 pb-12">{children}</div>;
};

export default Layout;
