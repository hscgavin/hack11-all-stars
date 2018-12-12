import React from 'react'

const ReviewItem = ({count, title, text})=>
    (<div className="div-review-item-wrap">
        {count} ---- {title} ---- {text}
    </div>)
;

export default ReviewItem;
