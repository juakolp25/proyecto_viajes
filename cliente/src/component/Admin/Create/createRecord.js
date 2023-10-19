import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from '../helpPanel/create';
import Edit from '../helpPanel/edit';
import { IsAuthenticated } from "../../../service/isAuteticate.js"

function CreateRecord() {
  return (
    <Router>
      <Switch>
        <Route path="admin/panel/create">
          <IsAuthenticated Component={Create} />
        </Route>
        <Route path="admin/panel/edit/:_id">
          <IsAuthenticated Component={Edit} />
        </Route>
      </Switch>
    </Router>
  );
}

export default CreateRecord;
