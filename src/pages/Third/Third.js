import React from 'react';
import { Link } from '@reach/router'
import { sleep } from 'Utils'

export default function Third(props) {
    return (
        <div className="container">
            <h2>Third Page</h2>
            <p>
                <strong>{props.text}</strong>
                Chocolate cake pudding candy marshmallow chocolate gummies macaroon muffin. 
                Wafer cupcake pie. Wafer cookie danish pudding candy canes. 
                Tart cotton candy gingerbread pie. 
                Biscuit macaroon muffin liquorice liquorice.
            </p>
            <p>
                Brownie pudding jelly-o cheesecake dessert biscuit soufflé chocolate bar lemon drops. 
                Liquorice pastry jujubes lollipop wafer pudding marzipan. 
                Candy cookie soufflé sweet muffin donut jelly. 
                Lollipop fruitcake pudding toffee topping tootsie roll cake. 
                Ice cream pastry marzipan dessert. 
                Dessert gummi bears cheesecake liquorice soufflé chocolate bar. 
                Lemon drops pastry cotton candy.
            </p>
            <p>
                <Link to={props.links.cancel}>
                    Back
                </Link>
            </p>
        </div>
    );
};

Third.getInitialProps = async function () {
    await sleep(500);
    return {
        text: 'Cupcake ipsum dolor sit amet.'
    };
}
