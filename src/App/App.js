import React, { Component } from 'react';
import CompanyAutosuggest from './Components/CompanyAutosuggest/CompanyAutosuggest';
import CompanyLogo from './Components/CompanyLogo/CompanyLogo';
import CompanyRating from './Components/CompanyRating/CompanyRating';
import styles from './App.less';
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
      summary: {},
      companyInfo: '',
    }
  }

  componentDidMount() {
    fetch('https://company-profiles-api.cloud.seek.com.au/v2/companies/432600')
      .then(res => res.json())
      .then(({data}) => {
        console.log(data)
        this.setState({
          companyInfo: data
        });
      })
  }

  onSuggestionSelected = (summary) => {
    fetch(`https://company-profiles-api.cloud.seek.com.au/v2/companies/${summary.id}`)
      .then( res => res.json())
      .then( companyInfo => {
        this.setState({
          summary,
          companyInfo
        })
      });
  };


  render() {
    const {companyInfo, summary} = this.state;
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
                { companyInfo && (
                  <div className={styles.companyInfo}>
                    <CompanyLogo companyLogoUrl={companyInfo.companyLogoUrl} companyName={companyInfo.Name}/>
                    <CompanyRating companyInfo={companyInfo}/>
                  </div>
                )}


              {/*<If condition={this.state.summary && this.state.summary.reviews}>*/}
                 {/*<For list={this.state.summary.reviews} onLoop={(item, i)=>(*/}
                    {/*<div>*/}
                      {/*<ReviewItem count={item.count} title={item.title} text={item.text}/>*/}
                    {/*</div>*/}
                 {/*)}/>*/}
              {/*</If>*/}
              </Section>
            </Card>
        </PageBlock>
        <Footer />
      </StyleGuideProvider>
    );
  }
}
