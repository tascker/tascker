import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

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
