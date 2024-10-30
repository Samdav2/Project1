 // App.jRs
import { useState } from "react"

 import React from "react";
 import Sidebar from "./components/Ui/Sidebar"; // Ensure the casing matches the file
 import MainDashboard from "./pages/MainDashboard/MainDashboard";
 import Header from './components/Ui/Header';
 import AnalyticsCards from './components/Ui/AnalyticsCards';
 import BigCards from './components/Ui/BigCards';
 import Statistics from './components/Ui/Statistics';
 import ProjectList from './components/Ui/ProjectList';
 import OrdersOverview from './components/Ui/OrdersOverview';
 import Footer from './components/Ui/Footer';
 import './App.css';



 function App() {
  render()
  {
   return (
     <div style={styles.page}>
       <Sidebar />
       <MainDashboard />
       <main style={styles.main}>
         <Header />
         <AnalyticsCards />
         <BigCards />
         <Statistics />
         <div style={styles.bottomSections}>
           <ProjectList />
           <OrdersOverview />
         </div>
         <Footer />
       </main>
     </div>
   );
 }
}

 export default App;
