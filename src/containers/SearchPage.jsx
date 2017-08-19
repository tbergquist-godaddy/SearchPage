import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import SearchFormContainer from './SearchFormContainer';
import FlightList from '../components/FlightList';
import { getSearchPage } from '../reducers';
import {
  searchSuggestionChange,
  searchForFlights,
} from '../actions/SearchPage.actions';

const Wrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
`;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.submitSearchForm = this.submitSearchForm.bind(this);
  }

  submitSearchForm(values) {
    const { fromSuggestions, toSuggestions, searchFlights } = this.props;
    const fromPlace = fromSuggestions.find(
      place => place.value === values.from,
    );
    const toPlace = toSuggestions.find(place => place.value === values.to);
    searchFlights(fromPlace.id, toPlace.id, values.date);
  }

  render() {
    const { flights, searchingFlights } = this.props;
    return (
      <Wrapper>
        <div className="row">
          <div className="col-xs-12">
            <SearchFormContainer
              {...this.props}
              onSubmit={this.submitSearchForm}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <FlightList flights={flights} />
            {searchingFlights ? <CircularProgress /> : null}
          </div>
        </div>
      </Wrapper>
    );
  }
}

SearchPage.propTypes = {
  fromSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  toSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchFlights: PropTypes.func.isRequired,
  flights: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchingFlights: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ...getSearchPage(state),
});

const mapDispatchToProps = dispatch => ({
  searchSuggestionChange: (text, key) => {
    dispatch(searchSuggestionChange(text, key));
  },
  searchFlights: (fromPlace, toPlace, date) => {
    dispatch(searchForFlights(fromPlace, toPlace, date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
