import { GET_JUDUL, JUDUL_ERROR} from "../type";
import axios from "axios";

export const getJUDUL = () => async dispatch => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

    dispatch({
      type: GET_JUDUL,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: JUDUL_ERROR,
      payload: console.log(e)
    });
  }
  // onCari: (value) =>
  // dispatch({
  //   type: CARI,
  //   payLoad: value
  // })
};
// export const getCARI = dispatch => {
//   return {
//     onCari: (value) =>
//       dispatch({
//         type: CARI,
//         payLoad: value
//       })
//   };
// };
