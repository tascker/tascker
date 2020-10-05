import React from "react";
import { Link } from "react-router-dom";

export default function Tasklist(props) {
  let searched = props.tasks.filter((task) => {
    console.log("searched task", props.tasks);
    return task.title.toLowerCase().includes(props.search.toLowerCase());
  });

  console.log("searched", searched);

  return (
    <div>
      {searched.map((task) => {
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
