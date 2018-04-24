import React from 'react'

export default class BaseComponent extends React.Component {

    showErrors = (errors, field) => {
        let result = [];
        if (field in errors) {
            errors[field].map((error, index) => {
                result.push(<div className="md-form mt-0 check-error-user" key={index}>
                    {error}
                </div>)
            })
        }
        return result;
    };

}