import React from "react";
import styles from "./style.css";
import $ from "jquery";

export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Home Page</h1>
        <p className={styles.welcomeText}>Here is the list of tasks!</p>
        <TaskList>yo</TaskList>
      </div>
    );
  }
}

class TaskList extends React.Component {

  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    console.log('mounted------------------', $.getJSON)
    $.getJSON('/tasks')
    .done(data => this.setState({tasks: data.tasks}))
    .fail(function(e) { console.dir(e); });
  }

  render() {
    return (
      <div>
        <div>
          <button>Done</button>
          <button>Important</button>
        </div>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
        </ul>
        <p>{this.state.tasks.length} tasks</p>
      </div>
    )
  }
}
