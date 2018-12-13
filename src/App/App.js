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
      fetching: true,
      company: {
        id: 12323,
        name: 'Bananas in pijamas',
        link: 'https://www.seek.com.au/companies/job-prospects-435969'
      },
      reviews: [
        {
          count: 12,
          title: 'Very nice',
          text: 'Cool! Very nice! Awesome company'
        },
        {
          count: 11,
          title: 'So so',
          text: 'Cool! Very nice! Awesome company'
        },
        {
          count: 1,
          title: 'Terrible',
          text: 'I prefer teletubyes'
        },
        {
          count: 99,
          title: 'Amazing',
          text: 'Are you think what I thinking B1?'
        }
      ]
    }
  }

  componentDidMount() {
    fetch('https://company-profiles-api.cloud.seek.com.au/v2/companies/432600')
      .then(res => res.json())
      .then(({data}) => {
        console.log(data)
        this.setState({
          companyInfo: data,
          fetching: false
        });
      }).catch( err => {
        this.setState({ fetching: false});
    });
  }

  onSuggestionSelected = (summary) => {
    console.log(summary)
    this.setState({ fetching: true});
    fetch(`https://company-profiles-api.cloud.seek.com.au/v2/companies/${summary.id}`)
      .then( res => res.json())
      .then( companyInfo => {
        this.setState({
          summary,
          companyInfo,
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
              <CompanyAutosuggest onSuggestionSelected={this.onSuggestionSelected}/>
            </Section>
          </Card>
        </PageBlock>
        <PageBlock>
          <Card>
            <Section>
              {fetching && (
                <Loader />
              )}
              { companyInfo && (
                <div className={styles.companyInfo}>
                  <CompanyLogo companyLogoUrl={companyInfo.companyLogoUrl} companyName={companyInfo.Name}/>
                  <CompanyRating companyInfo={companyInfo}/>
                </div>
              )}
              <ReviewList
                reviews={this.state.reviews}
                company={this.state.company}
              />
            </Section>
          </Card>
        </PageBlock>
        <Footer />
      </StyleGuideProvider>
    );
  }
}
