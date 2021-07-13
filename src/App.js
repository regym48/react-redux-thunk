import {Component} from "react";
import Judul from "./component/judul";
import store from './store/store';

class App extends Component{
  render(){
    return(
      <div>
        <h1 style={{textAlignVertical: "center",textAlign: "center",}}>Tampilan Redux</h1>
        <Judul store={store}/>
      </div>
    )
  }
}

export default App;
