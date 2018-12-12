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
import {If, For} from 'react-inline-logic'
import ReviewItem from './Components/ReviewItem'

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
            <Card>
              <Section>
              <If condition={this.state.summary && this.state.summary.reviews}>
                 <For list={this.state.summary.reviews} onLoop={(item, i)=>(
                    <div>
                      <ReviewItem count={item.count} title={item.title} text={item.text}/>
                    </div>
                 )}/> 
              </If>
              </Section>
            </Card>
        </PageBlock>
        <Footer />
      </StyleGuideProvider>
    );
  }
}
