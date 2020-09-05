import React from "react";

interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick?: (event: any) => void;
    className?: string;
}

const Button = (props: IButtonProps) => {
    let className = "customButton";
    if (props.className) {
        className = `${className} ${props.className}`;
    }
    return <button
        className={className}
        onClick={props.onClick}
    >
        { props.children }
    </button>
}

export default Button;