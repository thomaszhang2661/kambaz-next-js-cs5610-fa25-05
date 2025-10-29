"use client";
import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples/page";
import HelloReduxComponent from "./ReduxExamples/HelloRedux/HelloRedux";
import store from "./store";
import { Provider } from "react-redux";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  const [activeHash, setActiveHash] = React.useState<string>("#wd-click-event");

  React.useEffect(() => {
    function onHashChange() {
      setActiveHash(window.location.hash || "#wd-click-event");
    }
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <Provider store={store}>
      <div id="wd-lab4" className="container py-3">
        <h2>Lab 4 </h2>
        <p>
          This page hosts examples for click events, passing data on events, and
          passing functions as props. Each example demonstrates simple
          client-side interactivity required for this chapter.
        </p>

        <ul className="nav nav-pills mb-3 flex-wrap" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-click-event" ? "active" : ""
              }`}
              href="#wd-click-event"
            >
              Click Event
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-passing-data-on-event" ? "active" : ""
              }`}
              href="#wd-passing-data-on-event"
            >
              Passing Data
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-passing-functions" ? "active" : ""
              }`}
              href="#wd-passing-functions"
            >
              Passing Functions
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-display-event-obj-click" ? "active" : ""
              }`}
              href="#wd-display-event-obj-click"
            >
              Event Object
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-counter-use-state" ? "active" : ""
              }`}
              href="#wd-counter-use-state"
            >
              Counter
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-boolean-state-variables" ? "active" : ""
              }`}
              href="#wd-boolean-state-variables"
            >
              Boolean State
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-date-state-variables" ? "active" : ""
              }`}
              href="#wd-date-state-variables"
            >
              Date State
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-array-state-variables" ? "active" : ""
              }`}
              href="#wd-array-state-variables"
            >
              Array State
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${
                activeHash === "#wd-child-state" ? "active" : ""
              }`}
              href="#wd-child-state"
            >
              Shared State (Parent/Child)
            </a>
          </li>
        </ul>

        <div className="mb-4">
          <ClickEvent />
        </div>

        <div className="mb-4">
          <PassingDataOnEvent />
        </div>

        <div className="mb-4">
          <PassingFunctions theFunction={sayHello} />
        </div>

        <div className="mb-4">
          <EventObject />
        </div>

        <div className="mb-4">
          <Counter />
        </div>

        <div className="mb-4">
          <BooleanStateVariables />
        </div>

        <div className="mb-4">
          <StringStateVariables />
        </div>

        <div className="mb-4">
          <DateStateVariable />
        </div>

        <div className="mb-4">
          <ObjectStateVariable />
        </div>

        <div className="mb-4">
          <ArrayStateVariable />
        </div>

        <div className="mb-4">
          <ParentStateComponent />
        </div>
        <div className="mb-4">
          <ReduxExamples />
          <HelloReduxComponent />
        </div>
      </div>
    </Provider>
  );
}
