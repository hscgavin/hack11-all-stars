import React, { Component } from 'react';

import { TextLink, Section } from 'seek-style-guide/react';

import styles from './ReviewList.less';
import ReviewItem from '../ReviewItem/ReviewItem';

export default class ReviewList extends Component {
  render() {
    return (
      <div>
        <Section>
          {this.props.reviews.map((review, i) => (
            <ReviewItem review={review} key={i} />
          ))}
        </Section>
        <Section>
          <TextLink
            href={this.props.company.link}
            className={styles.company_link}
          >
            Read all reviews
          </TextLink>
        </Section>
      </div>
    );
  }
}
