import * as types from "./type"
import axios from "axios"

export const postuser = (username,password,role) =>async (dispatch) => {
  dispatch({ type: types.USER_LOADING });
  try {
    let res = await axios
    .post(`https://wild-puce-basket-clam-boot.cyclic.cloud/api/user/register`,{
      username,
      password,
      role
    }) 
    dispatch({ type: types.USER_SUCCESS, payload:(res.data.message)})
    
    return res.data
  } catch (error) {
    dispatch({ type: types.USER_ERROR, payload: error.message })
  }
  

};
