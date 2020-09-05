import React, { useState, useEffect } from "react";
import Button from "./Button";
import SantaAPI from "../api/Wish";
import Input from "./Input";
import { IStatus, STATUS } from "../App";

interface IFormProps {
    setStatus: (status: IStatus) => void;
    children?: JSX.Element | JSX.Element[]
}

const SantaForm = ({ children, setStatus}: IFormProps) => {
    const [username, setUsername] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<IStatus | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Make request to server API
        const result = await SantaAPI.createMessage({ username, message });
        if (result.status === "success") {
            setStatus({
                message: "Your message is being sent to Santa!",
                type: STATUS.SUCCESS
            });
        } else {
            setStatus({
                message: result.message,
                type: STATUS.ERROR
            });
        }
    }

    useEffect(() => {
        if (username === "") {
            setValidationMessage("Username is empty");
        } else if (message === "") {
            setValidationMessage("Message to Santa is empty");
        } else {
            setValidationMessage(null);
        }
    }, [username, message])

    return (
        <form 
            onSubmit={handleSubmit}
            className="form"    
        >
            <Input
                label="Who are you?"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="charlie.brown"
                value={username}
            />
            <Input
                label="What do you wish for christmas?"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="A choo choo train"
                multiline={true}
                rows={20}
                value={message}
            />
            {
                validationMessage &&
                <div 
                    className={"statusHelper errorStatus"}>
                    {validationMessage}
                </div>
            }
            <Button>Submit</Button>
        </form>
    )
}

export default SantaForm;