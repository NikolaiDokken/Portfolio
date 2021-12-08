import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { handleNew, handleGet, handleEdit } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/firebase";
import "../styles/admin.css";
import { uploadBytes, ref } from "@firebase/storage";

const dummyExp = {
    title: "",
    subtitle: "",
    start_date: new Date().toISOString().substring(0, 10),
    end_date: null,
};

export default function NewExperience() {
    const params = useParams();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            organization: "",
            logo: "",
            type: "",
            start_date: "",
            experiences: [dummyExp],
        },
        validationSchema: Yup.object({
            organization: Yup.string().required("Required"),
            type: Yup.string().required("Required"),
            start_date: Yup.string(),
            experiences: Yup.array().required("Required"),
        }),
        onSubmit: (values) => {
            if (params.id) {
                handleEdit("experience", params.id, values).then((expId) =>
                    navigate("/about")
                );
            } else {
                const file = document.getElementById("logo_input").files[0];
                const submitValues = {
                    ...values,
                    start_date: values.experiences.sort((a, b) => {
                        return new Date(b.start_date) - new Date(a.start_date);
                    })[0].start_date,
                    logo: file
                        ? "experience/" +
                          values.organization
                              .toLowerCase()
                              .replaceAll(" ", "_") +
                          "." +
                          file.type.split("/")[1]
                        : "",
                };
                handleNew("experience", submitValues).then((expId) => {
                    // Only upload img if experience is success
                    if (file) {
                        const storageRef = ref(storage, submitValues.logo);
                        uploadBytes(storageRef, file).then((snapshot) =>
                            navigate("/about")
                        );
                    } else {
                        navigate("/about");
                    }
                });
            }
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        if (params.id) {
            handleGet("experience", params.id)
                .then((exp) => {
                    if (exp) {
                        setValues(exp);
                    }
                })
                .catch((err) => console.log(err.message));
        }
    }, [params.id, setValues]);

    return (
        <div>
            <h1>Add New Experience</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Organization</label>
                <input
                    id="organization"
                    name="organization"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.organization}
                />
                {formik.touched.organization && formik.errors.organization ? (
                    <div>{formik.errors.organization}</div>
                ) : null}

                <label>Type</label>
                <input
                    id="type"
                    name="type"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                />
                {formik.touched.type && formik.errors.type ? (
                    <div>{formik.errors.type}</div>
                ) : null}

                <label>Logo</label>
                <input id="logo_input" type="file" accept="image/*" />

                {formik.values.experiences.map((exp, index) => (
                    <div key={index} style={{ marginLeft: 32 }}>
                        {formik.values.experiences.length > 1 && (
                            <button
                                type="button"
                                onClick={() =>
                                    formik.setFieldValue(
                                        "experiences",
                                        formik.values.experiences.filter(
                                            (exp, i) => i !== index
                                        )
                                    )
                                }
                            >
                                Remove
                            </button>
                        )}
                        <label>Title</label>
                        <input
                            id="title"
                            name={"experiences[" + index + "].title"}
                            type="text"
                            onChange={formik.handleChange}
                            value={exp.title}
                        />
                        <label>Subtitle</label>
                        <input
                            id="subtitle"
                            name={"experiences[" + index + "].subtitle"}
                            type="text"
                            onChange={formik.handleChange}
                            value={exp.subtitle}
                        />
                        <label>Start Date</label>
                        <input
                            id="start_date"
                            name={"experiences[" + index + "].start_date"}
                            type="date"
                            onChange={formik.handleChange}
                            value={exp.start_date}
                        />
                        <label>End Date</label>
                        <input
                            id="end_date"
                            name={"experiences[" + index + "].end_date"}
                            type="date"
                            onChange={formik.handleChange}
                            value={
                                exp.end_date ||
                                new Date().toISOString().substring(0, 10)
                            }
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() =>
                        formik.setFieldValue(
                            "experiences",
                            formik.values.experiences.concat(dummyExp)
                        )
                    }
                >
                    Add experience
                </button>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
