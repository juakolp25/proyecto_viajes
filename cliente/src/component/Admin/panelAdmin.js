import Navbar from "./helpPanel/navcreat.js";
import RecordList from "./helpPanel/recordList.js";
import SupcritionList from "./helpPanel/sucriplist.js"
import Context from "../../service/context.js";
import Admin from "../../pages/admin.js";
import { useContext } from "react";

const Panel = () => {

  const { isLogged } = useContext(Context);

  if (!isLogged) {
    return <Admin />;
  }

  //...Render
  return (
    <div>
        <Navbar />
        <RecordList />
        <SupcritionList />
    </div>
  );
};

//--Export
export default Panel;