import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BookmarkStarFill } from "react-bootstrap-icons";

export default function Tasklist(props) {
  const filtered = props.tasks.filter((task) => {
    if (props.search) {
      return task.title.toLowerCase().includes(props.search.toLowerCase());
    } else return task;
  });

  return (
    <div>
      {filtered.map((task) => {
        return (
          <div key={task._id}>
            <h3>
              <span>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => props.changePinned(task._id)}
                >
                  <BookmarkStarFill />
                </Button>
              </span>
              <Link to={`/tasks/${task._id}`}> {task.title}</Link>
              <span> {task.status}</span>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
