import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";

export default function PinnedTask(props) {
  const pinnedTask = props.tasks.filter((task) => task.pinned);
  console.log("pinned", pinnedTask);

  return (
    <div>
      <TaskList tasks={pinnedTask} search={props.search} />
    </div>
  );
}
