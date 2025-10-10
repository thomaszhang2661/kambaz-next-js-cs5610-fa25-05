"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "./Classes.css";
import todos from "./todos.json";
// Component for 3.2.1 Variables and Constants [cite: 1178]
function VariablesAndConstants() {
  const functionScoped = 2;
  const blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}
      <br />
      blockScoped = {blockScoped}
      <br />
      constant1 = {constant1}
      <hr />
    </div>
  );
}

// Component for 3.2.2 Variable Types [cite: 1185]
function VariableTypes() {
  const numberVariable = 123;
  const floatingPointNumber: number = 234.345;
  const stringVariable = "Hello World!";
  const booleanVariable = true;
  const isNumber = typeof numberVariable;
  const isString = typeof stringVariable;
  const isBoolean = typeof booleanVariable;
  return (
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = {numberVariable}
      <br />
      floatingPointNumber = {floatingPointNumber}
      <br />
      stringVariable = {stringVariable}
      <br />
      booleanVariable = {booleanVariable + ""}
      <br />
      isNumber = {isNumber}
      <br />
      isString = {isString}
      <br />
      isBoolean = {isBoolean}
      <hr />
    </div>
  );
}

// Component for 3.2.3 Boolean Variables [cite: 1193]
function BooleanVariables() {
  // 在这里添加缺失的变量定义
  const numberVariable = 123;
  const floatingPointNumber: number = 234.345;

  const true1 = true;
  const false1 = false;
  const false2 = true1 && false1;
  const true2 = true1 || false1;
  const true3 = !false2;
  const true4 = numberVariable === 123; // 现在可以正确使用
  const compareVal = 321.432;
  const true5 = floatingPointNumber !== compareVal;
  const false3 = numberVariable < 100; // 现在可以正确使用

  return (
    <div id="wd-boolean-variables">
      <h4>Boolean Variables</h4>
      true1 = {String(true1)}
      <br />
      false1 = {String(false1)}
      <br />
      false2 = {String(false2)}
      <br />
      true2 = {String(true2)}
      <br />
      true3 = {String(true3)}
      <br />
      true4 = {String(true4)}
      <br />
      true5 = {String(true5)}
      <br />
      false3 = {String(false3)}
      <hr />
    </div>
  );
}

// Component for 3.2.4 If Else [cite: 1204]
function IfElse() {
  const true1 = true;
  const false1 = false;
  return (
    <div id="wd-if-else">
      <h4>If Else</h4>
      {true1 && <p>true1</p>}
      {!false1 ? <p>!false1</p> : <p>false1</p>}
      <hr />
    </div>
  );
}

// Component for 3.2.5 Ternary Conditional Operator [cite: 1212]
function TernaryOperator() {
  const loggedIn = true;
  return (
    <div id="wd-ternary-operator">
      <h4>Logged In</h4>
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
    </div>
  );
}

// Components for 3.2.6 Generating conditional output
function ConditionalOutputIfElse() {
  // [cite: 1219]
  const loggedIn = true;
  if (loggedIn) {
    return <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>;
  } else {
    return (
      <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>
    );
  }
}

function ConditionalOutputInline() {
  // [cite: 1222]
  const loggedIn = false;
  return (
    <div id="wd-conditional-output-inline">
      {loggedIn && <h2>Welcome Inline</h2>}
      {!loggedIn && <h2>Please login Inline</h2>}
      <hr />
    </div>
  );
}

// Component for 3.3 JavaScript Functions [cite: 1230]
function LegacyFunctions() {
  function add(a: number, b: number) {
    return a + b;
  }
  const twoPlusFour = add(2, 4);
  return (
    <div id="wd-legacy-functions">
      <h4>Legacy ES5 functions</h4>
      twoPlusFour = {twoPlusFour}
      <br />
      add(2, 4) = {add(2, 4)}
      <hr />
    </div>
  );
}

// Component for 3.3.1 Arrow functions [cite: 1238]
function ArrowFunctions() {
  const subtract = (a: number, b: number) => {
    return a - b;
  };
  const threeMinusOne = subtract(3, 1);
  return (
    <div id="wd-arrow-functions">
      <h4>ES6 arrow functions</h4>
      threeMinusOne = {threeMinusOne}
      <br />
      subtract(3, 1) = {subtract(3, 1)}
      <hr />
    </div>
  );
}

// Component for 3.3.2 Implied Returns [cite: 1246]
function ImpliedReturn() {
  const multiply = (a: number, b: number) => a * b;
  const fourTimesFive = multiply(4, 5);
  return (
    <div id="wd-implied-return">
      <h4>Implied returns</h4>
      fourTimesFive = {fourTimesFive}
      <br />
      multiply(4, 5) = {multiply(4, 5)}
      <hr />
    </div>
  );
}

// Component for 3.3.3 Template Literals [cite: 1257]
function TemplateLiterals() {
  const five = 2 + 3;
  const result1 = "2 + 3 = " + five;
  const result2 = `2 + 3 = ${2 + 3}`;
  const username = "alice";
  const greeting1 = `Welcome home ${username}`;
  const loggedIn = false;
  const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;
  return (
    <div id="wd-template-literals">
      <h4>Template Literals</h4>
      result1 = {result1}
      <br />
      result2 = {result2}
      <br />
      greeting1 = {greeting1}
      <br />
      greeting2 = {greeting2}
      <hr />
    </div>
  );
}

// Component for 3.4 Working with Arrays [cite: 1268]
function SimpleArrays() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const htmlArray1 = [<li key="1">Buy milk</li>, <li key="2">Feed the pets</li>];
  return (
    <div id="wd-simple-arrays">
      <h4>Working with Arrays</h4>
      numberArray1 = {numberArray1.join(", ")}
      <br />
      stringArray1 = {stringArray1.join(", ")}
      <br />
      Todo list:
      <ol>{htmlArray1}</ol>
      <hr />
    </div>
  );
}

// Component for 3.4.1 Array index and length [cite: 1275]
function ArrayIndexAndLength() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const length1 = numberArray1.length;
  const index1 = numberArray1.indexOf(3);
  return (
    <div id="wd-array-index-and-length">
      <h4>Array index and length</h4>
      length1 = {length1}
      <br />
      index1 = {index1}
      <hr />
    </div>
  );
}

// Component for 3.4.2 Adding and Removing Data [cite: 1283]
function AddingAndRemovingToFromArrays() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  numberArray1.push(6);
  stringArray1.push("string3");
  numberArray1.splice(2, 1);
  stringArray1.splice(1, 1);
  return (
    <div id="wd-adding-removing-from-arrays">
      <h4>Adding and Removing Data to/from Arrays</h4>
      numberArray1 = {numberArray1.join(", ")}
      <br />
      stringArray1 = {stringArray1.join(", ")}
      <hr />
    </div>
  );
}

// Component for 3.4.3 For Loops [cite: 1289]
function ForLoops() {
  const stringArray1 = ["string1", "string3"];
  const stringArray2: string[] = [];
  for (let i = 0; i < stringArray1.length; i++) {
    const string1 = stringArray1[i];
    stringArray2.push(string1.toUpperCase());
  }
  return (
    <div id="wd-for-loops">
      <h4>For Loops</h4>
      stringArray2 = {stringArray2.join(", ")}
      <hr />
    </div>
  );
}

// Component for 3.4.4 The Map Function [cite: 1299]
function MapFunction() {
  const numberArray1 = [1, 2, 3, 4, 5, 6];
  const square = (a: number) => a * a;
  const todos_map = ["Buy milk", "Feed the pets"];
  const squares = numberArray1.map(square);
  const cubes = numberArray1.map((a) => a * a * a);
  return (
    <div id="wd-map-function">
      <h4>The Map Function</h4>
      squares = {squares.join(", ")}
      <br />
      cubes = {cubes.join(", ")}
      <br />
      Todos:
      <ol>
        {todos_map.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ol>
      <hr />
    </div>
  );
}

// Component for 3.4.5 The Find Function [cite: 1308]
function FindFunction() {
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2", "string3"];
  const four = numberArray1.find((a) => a === 4);
  const string3 = stringArray1.find((a) => a === "string3");
  return (
    <div id="wd-find-function">
      <h4>The Find Function</h4>
      four = {four}
      <br />
      string3 = {string3}
      <hr />
    </div>
  );
}

// Component for 3.4.6 The Find Index Function [cite: 1313]
function FindIndex() {
  const numberArray1 = [1, 2, 4, 5, 6];
  const stringArray1 = ["string1", "string3"];
  const fourIndex = numberArray1.findIndex((a) => a === 4);
  const string3Index = stringArray1.findIndex((a) => a === "string3");
  return (
    <div id="wd-find-index">
      <h4>The Find Index Function</h4>
      fourIndex = {fourIndex}
      <br />
      string3Index = {string3Index}
      <hr />
    </div>
  );
}

// Component for 3.4.7 The Filter Function [cite: 1321]
function FilterFunction() {
  const numberArray1 = [1, 2, 4, 5, 6];
  const numbersGreaterThan2 = numberArray1.filter((a) => a > 2);
  const evenNumbers = numberArray1.filter((a) => a % 2 === 0);
  const oddNumbers = numberArray1.filter((a) => a % 2 !== 0);
  return (
    <div id="wd-filter-function">
      <h4>The Filter Function</h4>
      numbersGreaterThan2 = {numbersGreaterThan2.join(", ")}
      <br />
      evenNumbers = {evenNumbers.join(", ")}
      <br />
      oddNumbers = {oddNumbers.join(", ")}
      <hr />
    </div>
  );
}
// Component for 3.4.8 JSON Stringify [cite: 1329]
function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];
  return (
    <div className="wd-json-stringify">
      <h3>JSON Stringify</h3>
      squares = {JSON.stringify(squares)}
      <hr />
    </div>
  );
}

// Component for 3.4.9 JSON [cite: 1341]
function House() {
  const house = {
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2000,
    address: {
      street: "Via Roma",
      city: "Roma",
      state: "RM",
      zip: "00100",
      country: "Italy",
    },
    owners: ["Alice", "Bob"],
  };
  console.log(house);
  return (
    <div id="wd-house">
      <h4>JavaScript Object Notation (JSON)</h4>
      <pre>{JSON.stringify(house, null, 2)}</pre>
      <hr />
    </div>
  );
}

// Components for 3.7 Todo List [cite: 1471, 1477]
const TodoItem = ({
  todo,
}: {
  todo: { done: boolean; title: string; status: string };
}) => {
  return (
    <ListGroupItem>
      <input type="checkbox" className="me-2" defaultChecked={todo.done} />
      {todo.title} ({todo.status})
    </ListGroupItem>
  );
};
function TodoList() {
  return (
    <div id="wd-todo-list">
      <h4>Implementing a simple ToDo List</h4>
      <ListGroup>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

// Component for 3.4.11 The Spread Operator [cite: 1353]
function Spreading() {
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5, 6];
  const obj1 = { a: 1, b: 2, c: 3 };
  const obj2 = { ...obj1, d: 4, e: 5, f: 6 };
  const obj3 = { ...obj1, b: 4 };
  return (
    <div id="wd-spreading">
      <h4>The Spread Operator</h4>
      arr2 = {JSON.stringify(arr2)}
      <br />
      obj2 = {JSON.stringify(obj2)}
      <br />
      obj3 = {JSON.stringify(obj3)}
      <hr />
    </div>
  );
}

// Component for 3.4.12 Destructing [cite: 1369]
function Destructing() {
  const person = { name: "John", age: 25 };
  const { name, age } = person;
  const numbers = ["one", "two", "three"];
  const [first, second, third] = numbers;
  return (
    <div id="wd-destructing">
      <h4>Destructing</h4>
      <h5>Object Destructing</h5>
      name = {name}, age = {age}
      <h5>Array Destructing</h5>
      first = {first}, second = {second}, third = {third}
      <hr />
    </div>
  );
}

// Component for 3.4.13 Function Destructing [cite: 1378]
function FunctionDestructing() {
  const subtract = ({ a, b }: { a: number; b: number }) => a - b;
  const difference = subtract({ a: 4, b: 2 });
  return (
    <div id="wd-function-destructing">
      <h4>Function Destructing</h4>
      difference = {difference}
      <hr />
    </div>
  );
}

// Component for 3.5.1 Working with HTML classes [cite: 1403, 1410, 1415]
function Classes() {
  const color = "blue";
  const dangerous = true;
  return (
    <div id="wd-classes">
      <h4>Working with HTML classes</h4>
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
      <div
        className={`${
          dangerous ? "wd-bg-red" : "wd-bg-green"
        } wd-fg-black wd-padding-10px`}
      >
        Red Dangerous background
      </div>
      <hr />
    </div>
  );
}

// Component for 3.5.2 Working with the HTML Style attribute [cite: 1423]
function Styles() {
  const bgRed = {
    backgroundColor: "lightcoral",
    color: "black",
    padding: "10px",
  };
  const bgBlue = {
    backgroundColor: "lightblue",
    color: "black",
    padding: "10px",
  };
  return (
    <div id="wd-styles">
      <h4>Working with the HTML Style attribute</h4>
      <div
        style={{
          backgroundColor: "lightyellow",
          color: "black",
          padding: "10px",
        }}
      >
        Yellow background
      </div>
      <div style={bgRed}>Red background</div>
      <div style={bgBlue}>Blue background</div>
      <hr />
    </div>
  );
}

// Component for 3.6 Parameterizing Components [cite: 1430]
function Add({ a, b }: { a: number; b: number }) {
  return (
    <div id="wd-add">
      <h4>Parameterizing Components</h4>a + b = {a + b}
      <hr />
    </div>
  );
}

// Components for 3.6.1 Child Components [cite: 1442, 1446]
function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return <span id="wd-square">{num * num}</span>;
}
function Highlight({ children }: { children: ReactNode }) {
  return (
    <span id="wd-highlight" style={{ backgroundColor: "yellow", color: "red" }}>
      {children}
    </span>
  );
}

// Component for 3.6.3 Encoding Path Parameters [cite: 1465]
function PathParameters() {
  return (
    <div id="wd-path-parameters">
      <h4>Encoding Path Parameters</h4>
      <Link className="btn btn-primary me-2" href="/Labs/Lab3/add/1/2">
        1 + 2
      </Link>
      <Link className="btn btn-danger" href="/Labs/Lab3/add/3/4">
        3 + 4
      </Link>
      <hr />
    </div>
  );
}

// Main Exported Component
export default function Lab3() {
  console.log("Hello World!");
  return (
    <div id="wd-lab3" className="container-fluid">
      <h3>Lab 3</h3>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <TodoList />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <Classes />
      <Styles />
      <Add a={3} b={4} />
      <h4>Child Components (Square of 4)</h4>
      <Square>4</Square>
      <hr />
      <h4>Child Components (Highlight)</h4>
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <hr />
      <PathParameters />
    </div>
  );
}
