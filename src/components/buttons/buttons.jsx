import style from "./buttons.module.css"

function Button ({onClick,className,children}){
    return (
        <>
        <button className={`${style.button} ${className}`} onClick={onClick}>
        {children}
        </button>
        </>
    )
};

export default Button;



