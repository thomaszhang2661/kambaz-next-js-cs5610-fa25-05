"use client";

"use client";

import Link from "next/link";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <div id="wd-lab-author">
        <h2>Jian Zhang</h2>
        <h3>SEC 05 </h3>
        <ul>
          <li>
            <Link href="/Labs/Lab1" id="wd-lab1-link">
              Lab 1: HTML Examples
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab2" id="wd-lab2-link">
              Lab 2: CSS Basics
            </Link>
          </li>
          <li>
            <Link href="/Labs/Lab3" id="wd-lab3-link">
              Lab 3: JavaScript Fundamentals
            </Link>
          </li>
          <li>
            <Link href="/" id="wd-kambaz-link">
              Kambaz Application
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05"
              id="wd-github"
            >
              GitHub Code Repository
            </Link>
          </li>
        </ul>
      </div>
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      {/* Heading Tags Exercise */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short title or
        heading that attempts to summarize the topic of the section it precedes.
        For instance this paragraph is preceded by the heading Heading Tags. The
        font of the section headings are usually larger and bolder than their
        subsection headings. This document uses headings to introduce topics
        such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
        can be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes: h1, h2,
        h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
        heading.
      </div>
      {/* Paragraph Tags Exercise */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. We often separate a long set of sentences with
          vertical spaces to make the text easier to read. Browsers ignore
          vertical white spaces and render all the text as one single set of
          sentences. To force the browser to add vertical spacing, wrap the
          paragraphs you want to separate with the paragraph tag
        </p>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>
      {/* Lists Exercise */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        My favorite recipe:
        <ol id="wd-your-favorite-recipe">
          <li>Marinate chicken thighs in soy sauce and garlic for 2 hours</li>
          <li>Heat sesame oil in a large skillet over medium-high heat</li>
          <li>Sear chicken until golden brown on both sides</li>
          <li>Add ginger, scallions, and rice wine to the pan</li>
          <li>Simmer covered for 15-20 minutes until cooked through</li>
          <li>Garnish with cilantro and serve over steamed rice</li>
        </ol>
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>
        Your favorite books (in no particular order)
        <ul id="wd-your-books">
          <li>The Midnight Library</li>
          <li>Atomic Habits</li>
          <li>Where the Crawdads Sing</li>
          <li>The Seven Husbands of Evelyn Hugo</li>
          <li>Educated</li>
        </ul>
      </div>
      {/* Table Exercise */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>TypeScript</td>
              <td>2/28/21</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>React Hooks</td>
              <td>3/7/21</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>State Management</td>
              <td>3/14/21</td>
              <td>91</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>API Integration</td>
              <td>3/21/21</td>
              <td>86</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>Database Design</td>
              <td>3/28/21</td>
              <td>93</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Testing</td>
              <td>4/4/21</td>
              <td>87</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>Performance</td>
              <td>4/11/21</td>
              <td>94</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>89</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Image Exercise */}
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet: <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        <br />
        Loading a local image:
        <br />
        <img id="wd-teslabot" src="/images/teslabot.jpeg" height="200px" />
      </div>
      {/* Forms Exercise */}
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
          <label htmlFor="wd-text-fields-password">Password:</label>
          <input
            type="password"
            defaultValue="123@#$asd"
            id="wd-text-fields-password"
          />
          <br />
          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" title="Alex" id="wd-text-fields-first-name" />{" "}
          <br />
          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input
            type="text"
            placeholder="Chen"
            defaultValue="Rodriguez"
            title="The last name"
            id="wd-text-fields-last-name"
          />
          <br />
          {/* Other HTML field types */}
          <h4>Other HTML field types</h4>
          <label htmlFor="wd-text-fields-email"> Email: </label>
          <input
            type="email"
            placeholder="jdoe@somewhere.com"
            id="wd-text-fields-email"
          />
          <br />
          <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
          <input
            type="number"
            defaultValue="100000"
            placeholder="1000"
            id="wd-text-fields-salary-start"
          />
          <br />
          <label htmlFor="wd-text-fields-rating"> Rating: </label>
          <input
            type="range"
            defaultValue="4"
            max="5"
            id="wd-text-fields-rating"
          />
          <br />
          <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
          <input
            type="date"
            defaultValue="2000-01-21"
            id="wd-text-fields-dob"
          />
          <br />
        </form>

        {/* Text boxes */}
        <h5>Text boxes</h5>
        <label>Biography:</label>
        <br />
        <textarea
          id="wd-textarea"
          cols={30}
          rows={10}
          defaultValue="As a computer science student, I am fascinated by the intersection of technology and human creativity. My journey began with curiosity about how software systems work, and has evolved into a passion for building applications that solve real-world problems. I enjoy exploring new programming languages, contributing to open-source projects, and learning about emerging technologies like artificial intelligence and blockchain. In my free time, I love hiking, photography, and experimenting with different cuisines from around the world."
        />

        {/* Buttons */}
        <h5 id="wd-buttons">Buttons</h5>
        <button
          type="button"
          onClick={() => alert("Life is Good!")}
          id="wd-all-good"
        >
          Hello World!
        </button>

        {/* Radio buttons */}
        <h5 id="wd-radio-buttons">Radio buttons</h5>
        <label>Favorite movie genre:</label>
        <br />
        <input type="radio" name="radio-genre" id="wd-radio-comedy" />
        <label htmlFor="wd-radio-comedy">Comedy</label>
        <br />
        <input type="radio" name="radio-genre" id="wd-radio-drama" />
        <label htmlFor="wd-radio-drama">Drama</label>
        <br />
        <input type="radio" name="radio-genre" id="wd-radio-scifi" />
        <label htmlFor="wd-radio-scifi">Science Fiction</label>
        <br />
        <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
        <label htmlFor="wd-radio-fantasy">Fantasy</label>

        {/* Checkboxes */}
        <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre:</label>
        <br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
        <label htmlFor="wd-chkbox-comedy">Comedy</label>
        <br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
        <label htmlFor="wd-chkbox-drama">Drama</label>
        <br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
        <br />
        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

        {/* Dropdowns */}
        <h4 id="wd-dropdowns">Dropdowns</h4>
        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label>
        <br />
        <select id="wd-select-one-genre" defaultValue="SCIFI">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label>
        <br />
        <select
          multiple
          id="wd-select-many-genre"
          defaultValue={["COMEDY", "SCIFI"]}
        >
          <option value="COMEDY"> Comedy </option>
          <option value="DRAMA"> Drama </option>
          <option value="SCIFI"> Science Fiction </option>
          <option value="FANTASY"> Fantasy </option>
        </select>
      </div>
      {/* Anchor tag */}
      <h4>Anchor tag</h4>
      Please
      <Link href="https://www.lipsum.com" id="wd-lipsum">
        click here
      </Link>
      to get dummy text
      <br />
      Check out my
      <Link
        href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05"
        id="wd-github"
      >
        GitHub repository
      </Link>
      <br />
    </div>
  );
}
