import React from 'react';
import {
    Building, Asset
} from 'space-studio';

export default function textToComponent (component, props) {
    delete props.component;
    if (component === 'Building') { return <Building {...props}/>; }
    if (component === 'Asset') { return <Asset {...props}/>; }
}