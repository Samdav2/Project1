import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Ui/Sidebar";
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
  return (
    <div className="app">
      <Sidebar />
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<MainDashboard />} />
         {/* <Route path="/analytics" element={<AnalyticsCards />} />
          <Route path="/big-cards" element={<BigCards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/orders" element={<OrdersOverview />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
