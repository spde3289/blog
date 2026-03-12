const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className="mx-auto mt-12 flex w-full max-w-350 flex-col px-3 py-4 md:px-4
        md:py-6 lg:px-8 lg:py-8 xl:px-15"
    >
      {children}
    </div>
  );
};

export default Layout;
