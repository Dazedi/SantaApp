import React, { useState } from "react";
import Form from "./components/SantaForm";
import GlitchFooter from "./components/GlitchFooter";
import Success from "./components/Success";
import Error from "./components/Error";

export enum STATUS { SUCCESS, ERROR }
export interface IStatus {
    message: string;
    type: STATUS;
    data?: any;
}

const App = () => {
    const [status, setStatus] = useState<IStatus | null>(null);

    return (
        <>
            <header>
                <h1>
                A letter to Santa
                </h1>
            </header>
            {
                status === null &&
                <Form setStatus={setStatus}/>
            }
            {
                status && status.type === STATUS.ERROR &&
                <Error message={status.message} />
            }
            {
                status && status.type === STATUS.SUCCESS &&
                <Success />
            }
            <GlitchFooter/>
        </>
    )
}

export default App;