 // App.jRs
import { useState } from "react"

 import React from "react"; 
 import Sidebar from "./components/Sidebar"; // Ensure the casing matches the file
 import MainDashboard from "./components/MainDashboard";
 import Header from './components/Header';
 import AnalyticsCards from './components/AnalyticsCards';
 import BigCards from './components/BigCards';
 import Statistics from './components/Statistics';
 import ProjectList from './components/ProjectList';
 import OrdersOverview from './components/OrdersOverview';
 import Footer from './components/Footer';
 import './App.css';
 

 
 function App() {
   return (
     <div style={styles.page}>
       <Sidebar /> {/* Add Sidebar component here if needed */}
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
 
 export default App;
 

  
  
    
