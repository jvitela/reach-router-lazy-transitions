import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from 'lib/AppRouter'
import getRoutes from 'routes'
import _debounce from 'lodash/debounce'
// import pages from 'pages'

import 'index.css'
import * as serviceWorker from 'serviceWorker'

ReactDOM.render(
    <Demo/>,
    document.getElementById('root')
);

const debounceCall = _debounce((set, state) => set(state), 300);

function Demo() {
    const [isLoading, setLoading] = useState(false);

    return (
        <React.Fragment>
            <AppRouter
                routes={getRoutes()}
                timeout={300}
                classNames="container--fade"
                onLoading={state => debounceCall(setLoading, state)}
            />
            {isLoading &&
                <div className="loading-backdrop">
                    <div className="loading-indicator">Loading...</div>
                </div>
            }
        </React.Fragment>
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
