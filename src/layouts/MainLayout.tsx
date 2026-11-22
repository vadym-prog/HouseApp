import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./MainLayout.module.css";

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={`${styles.layout} figma-grid-canvas`}>
      <Header />
      <main className={styles.main}>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
