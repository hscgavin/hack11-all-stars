import React, { Component } from 'react';
import CompanyAutosuggest from './Components/CompanyAutosuggest/CompanyAutosuggest';
import CompanyLogo from './Components/CompanyLogo/CompanyLogo';
import CompanyRating from './Components/CompanyRating/CompanyRating';
import styles from './App.less';
import {
  StyleGuideProvider,
  Header,
  Loader,
  Footer,
  PageBlock,
  Card,
  Section,
  Text,
} from 'seek-style-guide/react';
import ReviewList from './Components/ReviewList/ReviewList'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      summary: {},
      companyInfo: '',
      fetching: true
    }
  }

  componentDidMount() {
    fetch('https://company-profiles-api.cloud.seek.com.au/v2/companies/432600')
      .then(res => res.json())
      .then(({data}) => {
        this.setState({
          companyInfo: data,
          fetching: false
        });
      }).catch( err => {
        this.setState({ fetching: false});
    });
  }

  setFetchingState = () => {
    this.setState({
      fetching: true
    })
  };

  onSuggestionSelected = (summary) => {
    fetch(`https://company-profiles-api.cloud.seek.com.au/v2/companies/${summary.company.id}`)
      .then( res => res.json())
      .then( ({data}) => {
        this.setState({
          summary,
          companyInfo: data,
          fetching: false
        })
      })
      .catch(err=> {
        this.setState({ fetching: false});
      })
  };


  render() {
    const {companyInfo, summary, fetching} = this.state;
    return (
      <StyleGuideProvider>
        <Header activeTab="Company Reviews" />
        <PageBlock className={styles.header}>
          <Card transparent>
            <Section header>
              <Text heading className={styles.companyAutosuggestTitle}>Discover the right workplace - Powered By AI</Text>
              <CompanyAutosuggest setFetchingState={this.setFetchingState} onSuggestionSelected={this.onSuggestionSelected}/>
            </Section>
          </Card>
        </PageBlock>
        <PageBlock>
          <Card>
            <Section>
              {fetching && (
                <Loader />
              )}
              { !fetching && companyInfo && (
                <div className={styles.companyInfo}>
                  <CompanyLogo companyLogoUrl={companyInfo.companyLogoUrl} companyName={companyInfo.Name}/>
                  <CompanyRating companyInfo={companyInfo}/>
                </div>
              )}
              {
                !fetching && Object.keys(summary).length > 0 && (
                  <ReviewList
                    reviews={summary.reviews}
                    company={summary.company}
                  />
                )
              }
            </Section>
          </Card>
        </PageBlock>
        <Footer />
      </StyleGuideProvider>
    );
  }
}
