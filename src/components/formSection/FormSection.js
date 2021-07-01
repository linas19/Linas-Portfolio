import styles from "./FormSection.module.scss";
import React from "react";
import { useState } from "react";

export default function FormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const bottomRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    let data = {
      name,
      email,
      message,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
        // setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    });
  };
  return (
    <div className={styles.formSection} ref={bottomRef}>
      <h1>CONTACT</h1>
      <form className={styles.formSectionRight}>
        <input
          className={styles.formSectionRightTopBox}
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
        />
        <input
          className={styles.formSectionRightTopBox}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          required
        />
        <textarea
          className={styles.formSectionRightBottomBox}
          type="text"
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          name="message"
        />
        <input
          className={styles.submit}
          type="submit"
          value="Send"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
    </div>
  );
}
