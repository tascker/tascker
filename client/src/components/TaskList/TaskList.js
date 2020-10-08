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
          <div
            key={task._id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>
              <span>
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => props.changePinned(task._id)}
                >
                  <BookmarkStarFill />
                </Button>
              </span>
              <Link
                to={`/tasks/${task._id}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                {task.title}
              </Link>
            </h4>
            <p>
              {task.status === "to-do" ? (
                <span style={{ backgroundColor: "green" }}>{task.status}</span>
              ) : (
                <span style={{ backgroundColor: "yellow" }}>{task.status}</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
