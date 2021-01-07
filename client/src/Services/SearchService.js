import axios from "axios";

export default {
  searchTags: (text) => {
    return axios
      .post("/articles/search", {
        searchQuery: text,
      })
      .then((response) => {
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
