import First from 'pages/First/First'

export default function getRoutes() {
    return [
        {
            path: '/',
            component: First,
            links: {
                success: 'second' // relative path or '/second' for absolute path
            }
        },
        {
            path: 'second', // or '/second'
            importComponent: () => import('pages/Second/Second'),
            links: {
                success: '../third',
                cancel: '../' // Go back using relative path
            }
        },
        {
            path: 'third',
            importComponent: () => import('pages/Third/Third'),
            links: {
                cancel: '/' // use absolute path
            }
        }
    ];
}
