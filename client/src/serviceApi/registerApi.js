import axios from "axios";

//? REGISTER API
const registerFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/register`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? LOGIN API

const loginFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/login`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? LOGOUT API

const logoutFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/logout`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? CREATE TASK API

const createTaskFunction = async (payload) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let token = auth.token;

    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/postTasks`,
      payload,
      {
        headers: { Authorization: token },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? GET TASKS API
const getTasksFunction = async () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let token = auth.token;

    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/getTasks`,
      {
        headers: { Authorization: token },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? UPDATE TASKS API

const updateTasksFunction = async (id, payload) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let token = auth.token;
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/updateTasks/${id}`,
      payload,
      {
        headers: { Authorization: token },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? DELETE TASKS API

const deleteTasksFunction = async (id) => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let token = auth.token;
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/auth/deleteTasks/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  registerFunction,
  loginFunction,
  logoutFunction,
  createTaskFunction,
  getTasksFunction,
  updateTasksFunction,
  deleteTasksFunction,
};
