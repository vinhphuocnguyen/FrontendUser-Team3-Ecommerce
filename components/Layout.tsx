import Navbar from "./Header";
export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="flex h-10 justify-center items-center shadow-inner">
        <p>Copyright © 2023 LA COLLECTION</p>
      </footer>
    </>
  );
}
