import React from "react";

export interface IInputProps {
    label?: string;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input = (props: IInputProps) => {
    return (
        <>
            { props.label && <label>{ props.label }</label>}
            { 
                props.multiline ?
                <textarea
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    rows={props.rows}
                /> :
                <input
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
            }
        </>
    )
};

export default Input;