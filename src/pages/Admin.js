import { useFormik } from "formik";
import React from "react";
import { handleNew } from "../utils/utils";

export default function Admin() {
    const formik = useFormik({
        initialValues: {
            title: "",
            stack: "",
            description_md: "",
            github_link: "",
            start_date: new Date(),
            slug: "",
        },
        onSubmit: (values) => {
            console.log(handleNew("projects", values));
        },
    });

    return (
        <div>
            <h1>Add new project</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Title:
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </label>
                <label>
                    Stack:
                    <input
                        id="stack"
                        name="stack"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.stack}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
