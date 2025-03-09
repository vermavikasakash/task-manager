import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import {
  getTasksFunction,
  createTaskFunction,
  updateTasksFunction,
  deleteTasksFunction,
} from "../../serviceApi/registerApi";
import Button from "react-bootstrap/Button";
import styles from "../RegisterAndLogin/Register.module.css";
import { Container, Accordion } from "react-bootstrap";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [auth] = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const priorityList = ["High", "Medium", "Low"];
  const statusList = ["Pending", "Completed"];

  //? Fetching the Existing Tasks
  const GetTasksFunction = async () => {
    setLoader(true);
    const result = await getTasksFunction();
    if (result.status === 200) {
      setTasks(result.data.data);
    }
    setLoader(false);
  };

  useEffect(() => {
    GetTasksFunction();
  }, []);

  //? Change Handler (For Creating New Task)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  //? Change Handler (For Editing of Existing Task)
  const handleTaskChange = (e, id) => {
    const { name, value } = e.target;
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === id ? { ...t, [name]: value } : t))
    );
  };

  //? Handle Delete
  const handleDelete = async (id) => {
    setLoader(true);
    const result = await deleteTasksFunction(id);
    if (result.status === 200) {
      toast.success(result.data.message);
      GetTasksFunction();
    } else toast.error(result.response.data.message);
    setLoader(false);
  };

  //? Handle Update
  const handleUpdate = async (id) => {
    setLoader(true);
    const updatedTask = tasks.find((t) => t._id === id);
    const result = await updateTasksFunction(id, updatedTask);
    if (result.status === 200) {
      toast.success(result.data.message);
      GetTasksFunction();
    } else toast.error(result.response.data.message);
    setLoader(false);
  };

  //? Handle Submit (Creating Task)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!task.title || !task.description || !task.priority) {
      setError("All fields are required!");
      return;
    }
    setLoader(true);
    const result = await createTaskFunction(task);
    if (result.status === 200) {
      toast.success(result.data.message);
      GetTasksFunction();
      setTask({ title: "", description: "", priority: "" });
    } else {
      toast.error(result.response.data.message);
    }
    setLoader(false);
  };

  // ? GET TASKS BASED ON COMPLETION STATUS
  let taskToShow = tasks;

  //?  filter by category if selected
  if (category !== 1) {
    taskToShow = tasks.filter((item) => {
      if (category == 2) {
        return item.status.includes("Completed");
      } else if (category == 3) {
        return item.status.includes("Pending");
      }
      return true;
    });
  }

  //?  keyword filtering if there's a search term
  if (keyword.trim() !== "") {
    taskToShow = taskToShow.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // ! JSX START

  return (
    <Layout>
      <Container>
        <p className={styles.top_heading}>Welcome {auth?.user?.name}</p>

        <button
          className={styles.createDivBtn}
          onClick={() => {
            setDropdown(!dropdown);
            setError(null);
            setTask({ title: "", description: "", priority: "" });
          }}
        >
          + Create Task {dropdown ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>

        {dropdown && (
          <div className={styles.div_for_form}>
            <div className={styles.container}>
              <h2>Create Task</h2>
              <form onSubmit={handleSubmit} className={styles.taskForm}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={task.title}
                  onChange={handleChange}
                  className={styles.input}
                />
                <textarea
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={task.description}
                  onChange={handleChange}
                  className={styles.textarea}
                />

                {/* Priority Dropdown */}
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="" disabled>
                    Select Priority
                  </option>
                  {priorityList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <Button variant="success" type="submit" className={styles.btn}>
                  Create Task
                </Button>
              </form>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
        )}

        {/* //! VIEW TASK BY OPTION SELECTION  */}
        <p className={styles.para}>
          View created tasks by completion status or by title search
        </p>
        <div className={styles.tabDiv}>
          <div className={styles.btn_series_div}>
            <button
              className={`${
                category == 1 ? styles.activeTab : styles.inActiveTab
              } `}
              onClick={() => {
                setCategory(1);
                setKeyword("");
              }}
            >
              All
            </button>
            <button
              className={`${
                category == 2 ? styles.activeTab : styles.inActiveTab
              } `}
              onClick={() => {
                setCategory(2);
                setKeyword("");
              }}
            >
              Completed
            </button>
            <button
              className={`${
                category == 3 ? styles.activeTab : styles.inActiveTab
              } `}
              onClick={(e) => {
                setCategory(3);
                setKeyword("");
              }}
            >
              Pending
            </button>
          </div>

          <div>
            <input
              type="search"
              placeholder="Search by title"
              className={styles.input}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onClick={() => {
                setCategory(1);
              }}
            />
          </div>
        </div>

        {/* //? Task List for Editing */}
        <div className={styles.taskList}>
          <h2>Created Tasks</h2>
          {loader && <Loader />}
          {taskToShow.length == 0 && <p>No tasks created yet.</p>}
          {taskToShow.length !== 0 && !loader && (
            <table className={styles.table}>
              <tr className={styles.top_row}>
                <th className={styles.priority_col}>S No.</th>
                <th className={styles.top_col}>Title</th>
                <th className={styles.top_col}>Description</th>
                <th className={styles.priority_col}>Priority</th>
                <th className={styles.priority_col}>Status</th>
                <th className={styles.top_col}>Action</th>
              </tr>
              {/* //?  DATA FROM DB */}
              {taskToShow.map((item, index) => (
                <tr key={index} className={styles.details_row}>
                  <td className={styles.priority_col}>{index + 1}</td>
                  <td className={styles.top_col}>
                    <input
                      type="text"
                      name="title"
                      value={item.title}
                      onChange={(e) => handleTaskChange(e, item._id)}
                    />
                  </td>

                  <td className={styles.top_col}>
                    <input
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleTaskChange(e, item._id)}
                    />
                  </td>
                  <td className={styles.priority_col}>
                    {/* Priority Dropdown */}
                    <select
                      name="priority"
                      value={item.priority}
                      onChange={(e) => handleTaskChange(e, item._id)}
                    >
                      {priorityList.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.priority_col}>
                    {/* Status Dropdown */}
                    <select
                      name="status"
                      value={item.status}
                      onChange={(e) => handleTaskChange(e, item._id)}
                    >
                      {statusList.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.top_col}>
                    <Button
                      variant="primary"
                      className={styles.btn}
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.btn}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default HomePage;
