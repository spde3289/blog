const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="pt-5 sm:pt-11 pb-12">{children}</main>;
};

export default Layout;
