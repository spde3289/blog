import "@/styles/blog.css";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-3 md:px-4 lg:px-8 xl:px-[60px] flex flex-col py-4 mt-12 md:py-6 lg:py-8 ">
      {children}
    </div>
  );
};

export default Layout;
