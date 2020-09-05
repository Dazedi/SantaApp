import React from "react";
import Form from "./components/SantaForm";
import GlitchFooter from "./components/GlitchFooter";

const App = () => {
    return (
        <>
            <header>
                <h1>
                A letter to Santa
                </h1>
            </header>
            <Form/>
            <GlitchFooter/>
        </>
    )
}

export default App;