import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
      <MainDashboard />
      <Header />
      <OrdersOverview />
      <AnalyticsCards />
      <BigCards />
      <Statistics />
      <ProjectList />
      <Footer />
    </div>

  );
}

export default App
