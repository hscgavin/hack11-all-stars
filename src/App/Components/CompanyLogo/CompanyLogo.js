import styles from './CompanyLogo.less';
import React from 'react';
import PropTypes from 'prop-types';

export default class CompanyLogo extends React.Component {
  static propTypes = {
    companyName: PropTypes.string,
    companyLogoUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.companyLogoUrl) {
      return (
        <div className={styles.logoWrapper}>
          <img
            className={styles.logo}
            src={this.props.companyLogoUrl}
            data-automation="companyLogo-image"
            alt={`${this.props.companyName} logo`}
          />
        </div>
      );
    } else {
      return (
        <div
          aria-label="company logo"
          data-automation="companyLogo-defaultImage"
          className={styles.logoDefault}
        />
      );
    }
  }
}
