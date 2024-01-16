import axios from 'axios';

//url
const API_URL = '/api/issues/';

//Create new issue
const createIssue = async (issueData, token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, issueData, config);

  //return response data
  return response.data;
};

//Get user issues
const getIssues = async (token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  //return response data
  return response.data;
};

//Get user issues
const getIssue = async (issueId, token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + issueId, config);

  //return response data
  return response.data;
};

//Close issue
const closeIssue = async (issueId, token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + issueId,
    { status: 'fixed' },
    config
  );

  //return response data
  return response.data;
};

const issueService = {
  createIssue,
  getIssues,
  getIssue,
  closeIssue,
};

//exports issueService
export default issueService;
