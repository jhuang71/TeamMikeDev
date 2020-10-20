import React, { Fragment } from "react";

const TestButton = () => {
    const onClickButton = async () => {
        try {
            const response = fetch("http://localhost:5000/test", {
                method: "POST"
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <form>
                <button onClick={onClickButton}>Add Hermann Hall To Database</button>
            </form>
        </Fragment>
    )
}

export default TestButton;