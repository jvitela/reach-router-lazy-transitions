import First from 'pages/First/First'

export default function getRoutes() {
    var basePath = process.env.NODE_ENV === 'production' ? '/reach-router-lazy-transitions' : '/';
    return [
        {
            path: basePath,
            component: First,
            links: {
                success: 'second' // relative path or '/second' for absolute path
            }
        },
        {
            path: `${basePath}/second`, // or '/second'
            importComponent: () => import('pages/Second/Second'),
            links: {
                success: '../third',
                cancel: '../' // Go back using relative path
            }
        },
        {
            path: `${basePath}/third`,
            importComponent: () => import('pages/Third/Third'),
            links: {
                cancel: basePath // use absolute path
            }
        }
    ];
}
