import axios from "axios";

//root url
const API_URL = "/api/issues/";

//Get issue notes
const getNotes = async (issueId, token) => {
  //
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + issueId + "/notes", config);

  //return response data
  return response.data;
};

//Create issue note
const createNote = async (noteText, issueId, token) => {
  //headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //
  const response = await axios.post(
    API_URL + issueId + "/notes",
    { text: noteText },
    config
  );

  //return response data
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};
export default noteService;
