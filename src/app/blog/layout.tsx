const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="py-12 h-full">{children}</main>;
};

export default Layout;
