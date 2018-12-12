// import styles from './CompanyAutosuggest.less';
import React from 'react';
import PropTypes from 'prop-types';
import { Autosuggest } from 'seek-style-guide/react';
import { parse as parseAutosuggestMatches } from 'autosuggest-highlight/parse';



// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class CompanyAutosuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      summary: {}
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    event.preventDefault();
    fetch(
      `https://xdbcd0rryb.execute-api.ap-southeast-2.amazonaws.com/staging/api/summarized-review?id=${suggestion.id}`)
      .then(res => res.json()
      ).then(summary => {
        this.props.onSuggestionSelected(summary);
    }).catch( err => {
      console.log(err)
    })
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 1) {
      fetch(`https://xdbcd0rryb.execute-api.ap-southeast-2.amazonaws.com/staging/api/company-suggest?q=${value}`,
        ).then(res => {
        return res.json();
      }).then(result => {
        this.setState({
          suggestions: result
        });
      });

    };
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = suggestion => {
    return (
      <span>
        {
          suggestion.displayParts ?
            suggestion.displayParts
              .map(({ text, matches }) => parseAutosuggestMatches(text, matches))
              .map((highlightRules, partIndex) =>
                (<span key={partIndex} className={styles.suggestionPart}>
                  {
                    highlightRules.map(({ text, highlight }, ruleIndex) => (
                      <span key={ruleIndex} className={ classnames({ [styles.suggestionPartMatch]: highlight })}>
                        {text}
                      </span>
                    ))
                  }
                  &nbsp;</span>)
              ) :
            suggestion.displayText
        }
      </span>
    );
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for a company',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          inputProps={inputProps}
          autosuggestProps={{
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: getSuggestionValue,
            renderSuggestion: renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected,
            // shouldRenderSuggestions: shouldRenderSuggestions,
            // renderSectionTitle: renderSectionTitle,
            // getSectionSuggestions: getSectionSuggestions,
            suggestions
          }}
        />
      </div>
    );
  }
}
