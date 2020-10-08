import React from "react";
import { Form } from "react-bootstrap";

export default function Search(props) {
  return (
    <Form onSubmit={props.submitHandler}>
      <Form.Control
        type="text"
        name="search"
        id="search"
        value={props.search}
        onChange={props.searchHandler}
        placeholder="Search..."
      />
    </Form>
  );
}
