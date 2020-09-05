import React from "react";

interface IErrorProps {
    message: string;
}
const Error = ({ message }: IErrorProps) => {
    return <>
        <h1>Sorry!</h1>
        <p>There was a problem with your request</p>
        <p>{message}</p>
    </>
}

export default Error;