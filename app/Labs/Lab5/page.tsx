"use client";
import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import HttpClient from "./HttpClient";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href="/Labs/Lab5" className="list-group-item">
          Lab 5 Home
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <HttpClient />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArrays />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
