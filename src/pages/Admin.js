import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { handleNew } from "../utils/utils";
import "../styles/admin.css";

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
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            stack: Yup.string().required("Required"),
            slug: Yup.string().required("Required"),
            github_link: Yup.string().required("Required"),
            start_date: Yup.date().required("Required"),
            description_md: Yup.string(),
        }),
        onSubmit: (values) => {
            const newValues = {
                ...values,
                slug:
                    values.slug ||
                    values.title.toLowerCase().replaceAll(" ", "-"),
            };
            handleNew("projects", newValues);
        },
    });

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

                <label>Slug </label>
                <input
                    id="slug"
                    name="slug"
                    type="text"
                    onChange={formik.handleChange}
                    value={
                        formik.values.slug ||
                        formik.values.title.toLowerCase().replaceAll(" ", "-")
                    }
                />
                {formik.touched.slug && formik.errors.slug ? (
                    <div>{formik.errors.slug}</div>
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
