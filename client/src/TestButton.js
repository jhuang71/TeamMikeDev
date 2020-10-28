import React, { Fragment } from "react";

const TestButton = () => {
    const onClickBuilding = async (e) => {
        e.preventDefault();
        try {
            const response = fetch("http://localhost:5000/addBuilding", {
                method: "POST"
            })
        } catch (error) {
            console.error(error.message);
        }
    }
    const onClickSpace = async (e) => {
        e.preventDefault();
        try {
            const response = fetch("http://localhost:5000/addSpace", {
                method: "POST"
            })
        } catch (error) {
            console.error(error.message);
        }
    }
    const onClickUser = async (e) => {
        e.preventDefault();
        try {
            const response = fetch("http://localhost:5000/addUser", {
                method: "POST"
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <form>
                <button onClick={onClickBuilding}>Add Hermann Hall To Database</button>
                <button onClick={onClickSpace}>Add Space (location = Hermann Hall) To Database</button>
                <button onClick={onClickUser}>Add User To Database</button>
            </form>
        </Fragment>
    )
}

export default TestButton;