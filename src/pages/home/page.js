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
        <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Prio</th>
            <th>Urg</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasks.map(t => (<tr key={t.id}>
            <td>{t.title}</td>
          </tr>))}
        </tbody>
        </table>
        <p>{this.state.tasks.length} tasks</p>
      </div>
    )
  }
}
