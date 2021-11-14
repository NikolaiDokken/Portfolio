import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { handleNew, handleGet, handleEdit } from "../utils/utils";
import "../styles/admin.css";

export default function NewProject() {
    const params = useParams();
    const formik = useFormik({
        initialValues: {
            title: "",
            stack: "",
            description_md: "",
            github_link: "",
            start_date: new Date().toISOString().substring(0, 10),
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            stack: Yup.string().required("Required"),
            github_link: Yup.string().required("Required"),
            start_date: Yup.string(),
            description_md: Yup.string(),
        }),
        onSubmit: (values) => {
            if (params.id) {
                handleEdit("projects", params.id, values);
            } else {
                handleNew("projects", values);
            }
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        if (params.id) {
            handleGet("projects", params.id)
                .then((project) => {
                    if (project) {
                        setValues(project);
                    }
                })
                .catch((err) => console.log(err.message));
        }
    }, [params.id, setValues]);

    return (
        <div>
            <h1>Add new project</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                ) : null}

                <label>Stack</label>
                <input
                    id="stack"
                    name="stack"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.stack}
                />
                {formik.touched.stack && formik.errors.stack ? (
                    <div>{formik.errors.stack}</div>
                ) : null}

                <label>Github</label>
                <input
                    id="github_link"
                    name="github_link"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.github_link}
                />
                {formik.touched.github_link && formik.errors.github_link ? (
                    <div>{formik.errors.github_link}</div>
                ) : null}

                <label>Start date</label>
                <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                />
                {formik.touched.github_link && formik.errors.github_link ? (
                    <div>{formik.errors.github_link}</div>
                ) : null}

                <label>Description </label>
                <textarea
                    id="description_md"
                    name="description_md"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description_md}
                />
                {formik.touched.description_md &&
                formik.errors.description_md ? (
                    <div>{formik.errors.description_md}</div>
                ) : null}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
