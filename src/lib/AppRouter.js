import React, { Suspense, lazy, useReducer, useEffect } from 'react'
import { Router, Location } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
    initialState,
    reducer,
    locationChanged,
    pageEnter,
    pageExited,
    pageEntered,
} from './Utils'

const AppRouter = props => {
    return (
        <Location>
            {({ location }) =>
                <PageTransitionRouter {...props} location={location} />
            }
        </Location >
    );
}

/**
 * Handles page transitions on location change
 */
const PageTransitionRouter = ({
    location,
    routes,
    timeout,
    classNames,
    onLoading = () => { },
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch(locationChanged(location));
        onLoading(true);
    }, [location.key]);

    const { toRender, toFetchData } = groupEntities(state);

    return (
        <React.Fragment>
            {// Routes that need to fetch data
            toFetchData.map(({ entity, key }) => 
                <RouterLocation
                    key={key}
                    routes={routes}
                    location={entity.location}
                    initialProps={null}
                    onPageReady={iniProps => { dispatch(pageEnter(key, iniProps)); onLoading(false); }}
                />
            )}
            <TransitionGroup className="transition-group">
                {// Routes that are displayed
                toRender.map(({ entity, key }) => 
                    <CSSTransition
                        key={key}
                        timeout={timeout}
                        classNames={classNames}
                        onExited={() => dispatch(pageExited(key))}
                        onEntered={() => dispatch(pageEntered(key))}
                    >
                        <RouterLocation
                            routes={routes}
                            location={entity.location}
                            initialProps={entity.initialProps}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </React.Fragment>
    );
};

function groupEntities(state) {
    const toRender = [];
    const toFetchData = [];
    state.result.forEach(key => {
        const entity = state.entities[key];
        if (entity.initialProps === null) {
            // render a router that will output 
            //   a PageLoader wrapper while the initialData is being fetched            
            toFetchData.push({ entity, key });

        } else if (!entity.isExiting) {
            // Only render the CSSTransition if the initialProps are set
            //  And is not already exiting
            toRender.push({ entity, key });
        }
    });
    return { toRender, toFetchData };
}

/** 
 * Renders the given location
 */
class RouterLocation extends React.Component {
    // Prevent unnecessary renders
    shouldComponentUpdate(nextProps) {
        return (this.props.initialProps !== nextProps.initialProps);
    }

    render() {
        const { routes, location, initialProps, onPageReady } = this.props;
        return (
            <Router location={location} className="container">
                {routes.map(route => {
                    const Component = getComponent(route);
                    return (
                        <Component
                            key={route.path}
                            path={route.path}
                            initialProps={initialProps}
                            onPageReady={onPageReady}
                        />
                    );
                })}
            </Router>
        );
    }
}

/**
 * Return either a React.lazy or a HOC for initialProps
* @param {object} route The route info
*/
const getComponent = (route) => {
    if (route.importComponent) {
        return getLazyComponent(route);
    }

    if (route.component) {
        return withPageLifeCycle(route.component, route);
    }

    throw new Error('A route must include a component or importComponent method');
};

/**
 * A HOC that returns a Lazy component
 * 
 * @param {object} route The route info
 */
const getLazyComponent = (route) => {
    const LazyPage = lazy(async () => {
        const module = await route.importComponent();
        // Return the module wrapped in a HOC
        return {
            ...module,
            default: withPageLifeCycle(module.default, route)
        };
    });

    return props => (
        <Suspense fallback={null}>
            <LazyPage {...props} />
        </Suspense>
    );
}

const withPageLifeCycle = (Page, route) => {

    class PageLoader extends React.Component {
        // Load async dependencies for the page
        //  Only once after the component mounts
        componentDidMount() {
            this.fetchInitialProps().then(this.props.onPageReady);
        }

        async fetchInitialProps() {
            if (typeof Page.getInitialProps === 'function') {
                const iniProps = await Page.getInitialProps(this.props);
                return iniProps;
            }
            // return undefined or empty object
        }

        render() {
            // Don't render anything yet
            return null;
        }
    }

    const PageRenderer = ({ initialProps, onPageReady, ...pageProps }) => (
        <Page {...initialProps} {...pageProps} links={route.links} />
    );

    const Component = props => (
        props.initialProps === null
            ? <PageLoader {...props} />
            : <PageRenderer {...props} />
    );

    return Component;
}

export default AppRouter;