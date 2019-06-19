import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import api from '../../api/eb-api';
import HomePage from '../HomePage';
import EventDetail from '../EventDetail';
import './styles.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isFetching: true,
      currentPage: 1,
    };
    this.getEvents = this.getEvents.bind(this);
    this.detailEvent = this.detailEvent.bind(this);
    this.handleMoreResultsClick = this.handleMoreResultsClick.bind(this);
  }

  componentDidMount() {
    const { currentPage } = this.state;
    this.getEvents(currentPage);
  }

  getEvents = page => {
    api
      .get(`events/search/?expand=venue&location.address=madrid&page=${page}`)
      .then(res =>
        this.setState(prevState => {
          const oldEvents = prevState.events;
          const newEvents = res.data.events;

          return {
            events: [...oldEvents, ...newEvents],
            isFetching: false,
          };
        }),
      );
  };

  detailEvent(id) {
    const { events } = this.state;
    return events.find(event => event.id === id);
  }

  handleMoreResultsClick() {
    const { currentPage } = this.state;
    const nextCurrentPage = currentPage + 1;

    this.setState({
      currentPage: nextCurrentPage,
      isFetching: true,
    });
    this.getEvents(nextCurrentPage);
  }

  render() {
    const { events, isFetching } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                dataArr={events}
                loading={isFetching}
                moreResultsClick={this.handleMoreResultsClick}
              />
            )}
          />
          <Route
            path="/detail/:id"
            render={routerProps => (
              <EventDetail
                loading={isFetching}
                match={routerProps.match}
                dataArr={this.detailEvent(routerProps.match.params.id)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
