import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:'',
      showError:false,
      errorMessage:''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
      if (response.status === 404) {
        throw Error("The Github user does not exist");
      } else if (response.status === 503){
        throw Error("Github API does not respond");
      }
      throw Error(response.statusText);
    }
    return response.json();
  }

  handleSubmit(e) {
    let self = this;
    e.preventDefault();

    fetch('https://api.github.com/users/'+this.state.name+'/repos')
    .then(this.handleErrors)
    .then(function(response) {
      self.setState({repos: response,showError:false, errorMessage:''});
    }).catch(function(err) {
      // Error :(
      self.setState({repos: null, showError:true, errorMessage:err.message});
    });

  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  renderRepos() {
    if (this.state.repos) {
      if(this.state.repos.length > 0) {
        return (
          <div className="row justify-content-center">
            <div className="col col-md-8 offset-md-2">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>GitHub Repository</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.repos.map((repo, index)=>
                      <tr key={repo.id}>
                        <td>{index+1}.</td>
                        <td><a href={repo.html_url} target='_blank'>{repo.name}</a></td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
          );
      } else {
        return (
            <div className="alert alert-danger" role="alert">
              <strong>Github user has no repos</strong>
            </div>
          )
      }
    }
    return;
  }

  showError() {
    if(this.state.showError) {
      return (
          <div className="alert alert-danger" role="alert">
            <strong>{this.state.errorMessage}</strong>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sample app for geting data from GitHub by username</h2>
        </div>
        <div className="row">
          <form onSubmit={this.handleSubmit} className="my-form">
            <label>
              GitHub username:
              <input type="text" className="input-username" value={this.state.name} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Find" className="btn-submit"/>
          </form>
          {this.renderRepos()}
          {this.showError()}
        </div>
      </div>
    );
  }
}

export default App;
