import * as types from "./type"
import axios from "axios"

export const loginuser = (username,password) =>async (dispatch) => {
  dispatch({ type: types.USER_LOADING });
  try {
    let res = await axios
    .post(`https://wild-puce-basket-clam-boot.cyclic.cloud/api/user/login`,{
      username,
      password
    }) 
    dispatch({ type: types.USER_SUCCESS, payload:(res.data.message)})
    return res.data
  } catch (error) {
    dispatch({ type: types.USER_ERROR, payload: error.message })
  }
  

};
