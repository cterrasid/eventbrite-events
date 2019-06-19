import React from 'react';
import PropTypes from 'prop-types';
import EventList from '../EventList';
import './styles.scss';
import Loading from '../Loading';

const HomePage = props => {
  const { dataArr, loading, moreResultsClick } = props;

  let cardClasses = 'card-list__section';
  if (loading) {
    cardClasses += ' hidden__card-list';
  }
  return (
    <div className="page__container">
      <div className="circle">
        <div className="circle__back" />
        <div className="circle__front" />
      </div>
      <header className="page__header">
        <h1 className="page__title">Discover all the events around Madrid</h1>
      </header>
      {loading && <Loading classLoading="loading__container" />}
      <section className={cardClasses}>
        <EventList data={dataArr} moreResultsClick={moreResultsClick} />
      </section>
    </div>
  );
};

HomePage.propTypes = {
  dataArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  moreResultsClick: PropTypes.func.isRequired,
};

export default HomePage;
