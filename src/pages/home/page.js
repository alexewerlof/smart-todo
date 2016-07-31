import React from "react";
import styles from "./style.css";
import $ from "jquery";

export default class HomePage extends React.Component {
  render () {
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

  constructor () {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount () {
    $.getJSON('/tasks')
    .done(data => this.setState({tasks: data.tasks}))
    .fail(function(e) { console.dir(e); });
  }

  render () {
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
          {this.state.tasks.map(t => (<Task key={t.id} data={t}/>))}
        </tbody>
        </table>
        <p>{this.state.tasks.length} tasks</p>
      </div>
    )
  }
}

function classNameHelper (obj) {
  return Object.getOwnPropertyNames(obj).filter(k => obj[k]).join(' ');
}

class Task extends React.Component {
  isDone () {
    return this.props.data.progress === 1;
  }

  styles () {
    var ret = {};
    if (this.isDone()) {
      ret.textDecoration = 'line-through';
    }
    return ret;
  }

  render () {
    var data = this.props.data;
    return (<tr style={this.styles()}>
      <td>{data.title}</td>
      <td>{data.prio}</td>
      <td>{data.urg}</td>
    </tr>);
  }
}
