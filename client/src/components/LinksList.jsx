import React from "react";
import {Link} from "react-router-dom";


export const LinksList = ({links}) => {
    if(!links.length) {
        return <p className="center">There is no links yet</p>
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Original Link</th>
                    <th>Short Link</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                { links.map( (link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                {/* Link component allows open the link */}
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    );
                }) }
            </tbody>
        </table>
    );
}