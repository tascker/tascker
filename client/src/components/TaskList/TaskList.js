import React from "react";
import { Link } from "react-router-dom";

export default function Tasklist(props) {
  return (
    <div>
      {props.tasks.map((task) => {
        return (
          <div key={task._id}>
            <h3>
              <Link to={`/tasks/${task._id}`}>{task.title}</Link>
            </h3>
            <span>{task.status}</span>
          </div>
        );
      })}
    </div>
  );
}
