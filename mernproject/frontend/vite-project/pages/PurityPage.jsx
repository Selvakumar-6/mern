import React from "react";
import PurityForm from "../components/PurityForm";
import PurityList from "../components/PurityList";


const PurityPage = () => (
  <div>
    <h2>Purity Management</h2>
    <PurityForm onSuccess={() => {}} />
    <PurityList />
  </div>
);

export default PurityPage;
