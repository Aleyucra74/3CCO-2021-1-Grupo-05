import React, { useContext } from 'react';
import {Redirect, Route} from 'react-router-dom';
import StoreContext from '../../store/Context';

const RoutesPrivate = ({component: Component, ...rest}) => {
    const { token } = useContext(StoreContext);

    return (
        <Route 
            {...rest}
            render={() => token
                ? <Component {...rest} />
                : <Redirect to="/login" />
            }
        />
    )
}

export default RoutesPrivate;