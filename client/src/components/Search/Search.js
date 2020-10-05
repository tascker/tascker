import React from "react";

export default function Search(props) {
  return (
    <form onSubmit={props.submitHandler}>
      <input
        type="text"
        name="search"
        id="search"
        value={props.search}
        onChange={props.searchHandler}
        placeholder="Search..."
      />
    </form>
  );
}
