import React, { Component } from 'react';

import { Card, Text } from 'seek-style-guide/react';

import styles from './ReviewItem.less';

export default class ReviewItem extends Component {
  render() {
    return (
      <Card transparent>
        <div className={styles.review_title}>
          <Text heading className={styles.review_title_heading}>
            {this.props.review.title}
          </Text>
          <span className={styles.review_title_count}>
            in {this.props.review.count} review
            {this.props.review.count > 1 ? 's' : ''}
          </span>
        </div>
        <div className={styles.review_text}>
          <Text>{this.props.review.text}</Text>
        </div>
      </Card>
    );
  }
}
