import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function GetTime() {
  // initiate time to be user current time
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "Guest");
  // const guest = "Guest";

  // update time every second using setInterval
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("name", name);

    setName(name);
    closeModal();
  }

  return (
    <>
      <div>
        <h1 id="time">
          {time
            .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
            .replace(/AM|PM/, "")}
        </h1>

        {time.getHours() > 4 && time.getHours() <= 11 ? (
          <h2 id="greeting">
            Good Morning, {name}
            <Button type="button" className="btn btn-link" onClick={openModal}>
              <FontAwesomeIcon id="edit" icon={faPenToSquare} />
            </Button>
          </h2>
        ) : time.getHours() > 11 && time.getHours() <= 16 ? (
          <h2 id="greeting">
            Good Afternoon, {name}
            <Button type="button" className="btn btn-link" onClick={openModal}>
              <FontAwesomeIcon id="edit" icon={faPenToSquare} />
            </Button>
          </h2>
        ) : (
          <h2 id="greeting">
            Good evening, {name}
            <Button type="button" className="btn btn-link" onClick={openModal}>
              <FontAwesomeIcon id="edit" icon={faPenToSquare} />
            </Button>
          </h2>
        )}
      </div>

      <Modal
        show={open}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Change Name
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
