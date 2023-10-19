import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Admin from "./pages/admin";
import Home from "./pages/home";
import { MyProvider } from "./service/context";
import Panel from "./component/Admin/panelAdmin"
import Create from "./component/Admin/helpPanel/create";
import Edit from "./component/Admin/helpPanel/edit";
import SingleImage from './component/Home/helpHome/singleImage.js';

 
const App = () => {
 return (
   <div>
   <MyProvider>
     <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/image/:_id" element={<SingleImage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/panel" element={<Panel />} />
        <Route path="/admin/panel/create" element={<Create />} />
        <Route path="/admin/panel/edit/:_id" element={<Edit />} />
     </Routes>
    </MyProvider>
   </div>
 );
};
 
export default App;