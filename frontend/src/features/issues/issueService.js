import axios from "axios";

//url
const API_URL = "/api/issues/";

//Create new issue
const createIssue = async (issueData, token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, issueData, config);

  console.log(response.data);
  //return response data
  return response.data;
};

const issueService = {
  createIssue,
};

//exports ticketService
export default issueService;
