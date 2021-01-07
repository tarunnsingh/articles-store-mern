import axios from "axios";

export default {
  getAllUsers: () => {
    return axios.get("/user/all", { json: true }).then((response) => {
      // console.log(response);
      if (
        response.status !== 404 &&
        response.status !== 401 &&
        response.status !== 500
      ) {
        return response.data;
      } else {
        return response.json({
          message: { msgBody: "Not Found", msgError: true },
        });
      }
    });
  },
};
