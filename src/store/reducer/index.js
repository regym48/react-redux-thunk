import { combineReducers } from 'redux';
import judulReducer from './judulReducer';



export default combineReducers({
  judul: judulReducer
})