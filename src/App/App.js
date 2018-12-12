import React, { Component } from 'react';
import CompanyAutosuggest from './Components/CompanyAutosuggest/CompanyAutosuggest';
import {
  StyleGuideProvider,
  Header,
  Footer,
  PageBlock,
  Card,
  Section,
  Text,
} from 'seek-style-guide/react';
import styles from './App.less';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      showMessage: false,
      summary: {}
    };
  }

  onSuggestionSelected = (summary) => {
    console.log(summary)
    this.setState({
      summary
    })
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.type === 'checkbox' ? target.checked : target.value
    });
  };

  render() {
    return (
      <StyleGuideProvider>
        <Header activeTab="Company Reviews" />

        <PageBlock>
          <Card transparent>
            <Section header>
              <Text hero>Company Reviews</Text>
            </Section>
          </Card>

          <Card>
            <Section>
              <div>
                <CompanyAutosuggest onSuggestionSelected={this.onSuggestionSelected}/>
              </div>
            </Section>
          </Card>
          {
            this.state.summary && this.state.summary.reviews &&
            <Card>
              <Section>
                <div>
                  {this.state.summary.reviews[0].text}
                </div>
              </Section>
            </Card>
          }

        </PageBlock>

        <Footer />
      </StyleGuideProvider>
    );
  }
}
