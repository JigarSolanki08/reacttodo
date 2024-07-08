import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import "./App.css";

function App() {
  const [taskvalue, setTaskvalue] = useState({
    task: "",
    desc: "",
  });

  const [alltask, setAlltask] = useState([]);
  const [complete, setComplete] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleDelClick = (index, isComplete) => {
    if (isComplete) {
      const updatedTasks = complete.filter((_, i) => i !== index);
      setComplete(updatedTasks);
    } else {
      const updatedTasks = alltask.filter((_, i) => i !== index);
      setAlltask(updatedTasks);
    }
  };

  const handleDoneClick = (index) => {
    const completedTask = alltask[index];
    setComplete([...complete, completedTask]);
    const pendingTasks = alltask.filter((_, i) => i !== index);
    setAlltask(pendingTasks);
  };

  const handleAddClick = () => {
    if (taskvalue.task && taskvalue.desc) {
      setAlltask([...alltask, taskvalue]);
      setTaskvalue({ task: "", desc: "" });
    }
  };

  const pendingTasksList = alltask.map((task, index) => (
    <div
      className="d-flex justify-content-around align-content-center border border-success w-75 m-auto border-opacity-50 shadow rounded bg-dark bg-gradient text-success mt-3"
      key={index}
    >
      <div>
        <h1>{task.task}</h1>
        <p className="text-opacity-25">{task.desc}</p>
      </div>
      <div className="fs-3">
        <RiDeleteBin7Line
          className="rired me-2"
          onClick={() => handleDelClick(index, false)}
        />
        <MdOutlineDone className="rigreen" onClick={() => handleDoneClick(index)} />
      </div>
    </div>
  ));

  const completedTasksList = complete.map((task, index) => (
    <div
      className="d-flex justify-content-around align-content-center border border-success w-75 m-auto border-opacity-50 shadow rounded bg-dark bg-gradient text-success mt-3"
      key={index}
    >
      <div>
        <h1>{task.task}</h1>
        <p className="text-opacity-25">{task.desc}</p>
      </div>
      <div className="fs-3">
        <RiDeleteBin7Line
          className="rired me-2"
          onClick={() => handleDelClick(index, true)}
        />
      </div>
    </div>
  ));

  return (
    <div className="container d-flex p-2 justify-content-center flex-column ">
      <h1 className="text-center mt-3">My Todos</h1>
      <div className="container">
        <div className="d-flex justify-content-evenly mt-5 flex-wrap">
          <div>
            <h3>Title</h3>
            <input
              type="text"
              placeholder="Enter Task name"
              className="form-control"
              value={taskvalue.task}
              onChange={(e) => {
                setTaskvalue({
                  ...taskvalue,
                  task: e.target.value,
                });
              }}
            />
          </div>
          <div className="d-flex">
            <div>
              <h3>Description</h3>
              <input
                type="text"
                placeholder="Enter Task Description"
                className="form-control"
                value={taskvalue.desc}
                onChange={(e) => {
                  setTaskvalue({
                    ...taskvalue,
                    desc: e.target.value,
                  });
                }}
              />
            </div>
            <div className="d-flex ms-3">
              <input
                type="submit"
                name="Add"
                value="Add"
                className="btn btn-success"
                onClick={handleAddClick}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start mt-5 flex-wrap">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={!showCompleted}
            onChange={() => setShowCompleted(false)}
          />
          <label className="btn btn-outline-success" htmlFor="btnradio1">
            Todo
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            checked={showCompleted}
            onChange={() => setShowCompleted(true)}
          />
          <label className="btn btn-outline-success ms-3" htmlFor="btnradio2">
            Completed
          </label>
        </div>
        <div className="mt-5">
          {showCompleted ? completedTasksList : pendingTasksList}
        </div>
      </div>
    </div>
  );
}

export default App;