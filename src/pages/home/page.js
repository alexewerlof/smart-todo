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
            <th title="Priority or importance">Prio</th>
            <th>Urg</th>
            <th title="Earliest this task can start">Start</th>
            <th title="Deadline">End</th>
            <th title="Prerequesites of this task">Prereq</th>
            <th title="Is this task bound to a particular location">Where</th>
            <th>Notes</th>
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

  constructor () {
    super();
    this.state = {
      urg: false
    };
    this.toggleUrge = this.toggleUrge.bind(this);
  }

  componentWillMount() {
    this.setState({urg: this.props.data.urg});
  }

  toggleUrge () {
    this.setState({urg: !this.state.urg});
  }

  isDone () {
    return this.props.data.progress === 1;
  }

  styles () {
    var ret = {};
    if (this.isDone()) {
      ret.textDecoration = 'line-through';
    }
    if (this.state.urg) {
      ret.fontWeight = 'bold'
    }
    return ret;
  }

  render () {
    var data = this.props.data;
    return (<tr style={this.styles()}>
      <td><TaskProgress progress={data.progress}/>{data.title}</td>
      <td>{data.prio}</td>
      <td><input type="checkbox" checked={this.state.urg} onChange={this.toggleUrge}/></td>
      <td><input type="date" /></td>
      <td><input type="date" /></td>
      <td>p</td>
      <td>
        <select>
          <option></option>
          <option>Home</option>
          <option>Work</option>
          <option>On the way</option>
        </select>
      </td>
      <td><textarea /></td>
    </tr>);
  }
}

function TaskProgress (props) {
  var bgStyle = {
    width:'50px',
    display: 'inline-block',
    backgroundColor: '#ccc',
    margin: '0.2em'
  };
  var fillStyle = {
    backgroundColor: 'red',
    width: props.progress * 100 + '%',
    height: '0.5em'
  };
  return (<div style={bgStyle}>
    <div style={fillStyle}></div>
  </div>);
}
