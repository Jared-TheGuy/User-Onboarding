import React from 'react';

export default function Card(props) {
    return (
        <div className="card">
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
        </div>
    )
}