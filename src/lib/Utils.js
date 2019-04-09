
const onLocationChanged = (state, location) => {
    const result = state.result.concat(location.key);
    const entities = {
        ...state.entities,
        [location.key]: {
            location,
            initialProps: null,
            isExiting: false,
            isEntered: false
        }
    };
    return { result, entities };
};

const onPageEnter = (state, key, initialProps = {}) => {
    const entities = state.result.reduce((accumulator, currKey) => {
        if (currKey === key) {
            accumulator[key] = {
                ...state.entities[key],
                initialProps,
            };

        } else {
            accumulator[currKey] = {
                ...state.entities[currKey],
                isExiting: true,
            };
        }
        return accumulator;
    }, {});

    return { ...state, entities };
};

const onPageExited = (state, key) => {
    const result = state.result.filter(itm => (itm !== key));
    const { [key]: removed, ...entities } = state.entities;
    return { result, entities };
};

const onPageEntered = (state, key) => {
    return {
        ...state,
        entities: {
            ...state.entities,
            [key]: {
                ...state.entities[key],
                isEntered: true
            }
        }
    };
};

export const locationChanged = location => ({ type: 'locationChanged', location });
export const pageEnter = (key, initialProps) => ({ type: 'pageEnter', key, initialProps });
export const pageExited = key => ({ type: 'pageExited', key });
export const pageEntered = key => ({ type: 'pageEntered', key });

export const initialState = {
    result: [],
    entities: {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'locationChanged':
            return onLocationChanged(state, action.location);

        case 'pageEnter':
            return onPageEnter(state, action.key, action.initialProps);

        case 'pageExited':
            return onPageExited(state, action.key);

        case 'pageEntered':
            return onPageEntered(state, action.key);

        default:
            return state;
    }
};
