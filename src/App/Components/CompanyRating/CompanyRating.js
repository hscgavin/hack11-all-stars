import styles from './CompanyRating.less';
import React from 'react';
import PropTypes from 'prop-types';
import roundTo from 'round-to';
import { Text, Rating } from 'seek-style-guide/react';

export default class CompanyRating extends React.Component {
  static propTypes = {
    companyInfo: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { companyInfo } = this.props;

    if (!companyInfo || !companyInfo.companyReviewSummary || !companyInfo.companyReviewSummary.reviewsCount) {
      return null;
    }

    const averageCompanyRating = roundTo(companyInfo.companyReviewSummary.averageCompanyRating, 1);

    return (
      <div className={styles.companyInfoContainer}>
        <Text hero>
          {companyInfo.companyName}
        </Text>
        <div className={styles.starRatingContainer} data-automation="pill-starRatingContainer">
          <div>
            <div className={styles.starRating} alt="star rating" data-automation="pill-starRating">
              <Rating alt="star rating" rating={averageCompanyRating} heading />
            </div>
            <Text subheading regular
                  data-automation="pill-starRatingText">
              {averageCompanyRating.toFixed(1)} overall rating from <span data-automation="pill-reviewCount">{companyInfo.companyReviewSummary.reviewsCount}</span> employee reviews
            </Text>
          </div>
        </div>
      </div>
    );
  }
}
