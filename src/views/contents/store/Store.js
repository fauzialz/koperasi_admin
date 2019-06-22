import React from 'react'
import ContentBase from '../../../components/content_package_base';
import ConfigContent from '../../../config/ConfigContent';

const Store = (props) => {
    return (
        <ContentBase config={ConfigContent.STORE} />
    )
}

export default Store