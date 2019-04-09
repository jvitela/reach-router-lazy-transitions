import React, { useState } from 'react';
import { Link } from '@reach/router'

export default function Second(props) {
    const [isLoading, setLoading] = useState(false);
    return (
        <div className="Second">
            <h2>Second Page</h2>
            <p>
                Marshmallow wafer powder lollipop.
                Candy dessert croissant jelly-o biscuit pastry sesame snaps gummi bears. 
                Halvah pudding soufflé cheesecake icing. 
                Donut marshmallow gummies oat cake cheesecake I love. 
                Chocolate cake bonbon icing chocolate bar muffin pudding gingerbread I love sesame snaps. 
                Soufflé jujubes macaroon chocolate bar oat cake icing jelly beans gingerbread.
            </p>

            <button
                type="button"
                onClick={() => props.navigate(props.links.cancel)}
            >
                Back
            </button>
            {isLoading
                ? 'isLoading..'
                : (
                    <Link to={props.links.success} onClick={() => setLoading(true)}>
                        Next
                    </Link>
                )
            }
        </div>
    );
};
