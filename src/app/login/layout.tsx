import { ReactNode } from "react";
import LabelBottomNavigation from "../../components/BottomNavigation";
import ActionButton from "../../components/ActionButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <LabelBottomNavigation />
      <ActionButton />
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
