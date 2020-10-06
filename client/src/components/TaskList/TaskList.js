import React from "react";
import { Link } from "react-router-dom";

export default function Tasklist(props) {
  const searched = props.tasks.filter((task) => {
    if (props.search) {
      return task.title.toLowerCase().includes(props.search.toLowerCase());
    } else return task;
  });

  //console.log("searched", searched);

  return (
    <div>
      {searched.map((task) => {
        return (
          <div key={task._id}>
            <h3>
              <Link to={`/tasks/${task._id}`}>{task.title}</Link>
              <span> {task.status}</span>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
