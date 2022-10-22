import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { handleNew, handleGet, handleEdit } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { Button, Stack, TextField } from "@mui/material";

const dummyExp = {
    title: "",
    subtitle: "",
    start_date: new Date().toISOString().substring(0, 10),
    end_date: null,
};

export default function NewExperience() {
    const params = useParams();
    const [logo, setLogo] = useState("");
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
            const file = document.getElementById("logo_input").files[0];
            const submitValues = {
                ...values,
                start_date: values.experiences.sort((a, b) => {
                    return new Date(b.start_date) - new Date(a.start_date);
                })[0].start_date,
                logo: file ? "experience/" + values.organization.toLowerCase().replaceAll(" ", "_") : values.logo,
            };
            const storageRef = ref(storage, submitValues.logo);
            if (params.id) {
                handleEdit("experience", params.id, submitValues).then((expId) => {
                    if (file) {
                        uploadBytes(storageRef, file).then((snapshot) => navigate("/about"));
                    } else {
                        navigate("/about");
                    }
                });
            } else {
                handleNew("experience", submitValues).then((expId) => {
                    // Only upload img if experience is success
                    if (file) {
                        uploadBytes(storageRef, file).then((snapshot) => navigate("/about"));
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
                        if (exp.logo) {
                            const imageRef = ref(storage, exp.logo);
                            getDownloadURL(imageRef)
                                .then((url) => setLogo(url))
                                .catch((err) => console.log(err.message));
                        }
                    }
                })
                .catch((err) => console.log(err.message));
        }
        document.getElementById("logo_input").onchange = (e) => {
            const file = document.getElementById("logo_input").files[0];
            if (file) {
                setLogo(URL.createObjectURL(file));
            }
        };
    }, [params.id, setValues]);

    return (
        <div>
            <h1>Add New Experience</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        id="organization"
                        name="organization"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.organization}
                        label="Organization"
                        size="small"
                    />
                    {formik.touched.organization && formik.errors.organization ? (
                        <div>{formik.errors.organization}</div>
                    ) : null}

                    <TextField
                        id="type"
                        name="type"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.type}
                        label="Type"
                        size="small"
                    />
                    {formik.touched.type && formik.errors.type ? <div>{formik.errors.type}</div> : null}

                    <label>Logo</label>
                    <input id="logo_input" type="file" accept="image/*" />
                    {logo && <img style={{ height: 100 }} src={logo} alt="Logo"></img>}

                    {formik.values.experiences.map((exp, index) => (
                        <Stack key={index} spacing={2}>
                            {formik.values.experiences.length > 1 && (
                                <Button
                                    onClick={() =>
                                        formik.setFieldValue(
                                            "experiences",
                                            formik.values.experiences.filter((exp, i) => i !== index)
                                        )
                                    }
                                >
                                    Remove
                                </Button>
                            )}

                            <TextField
                                id="title"
                                name={"experiences[" + index + "].title"}
                                type="text"
                                onChange={formik.handleChange}
                                value={exp.title}
                                label="Title"
                                size="small"
                            />
                            <TextField
                                id="subtitle"
                                name={"experiences[" + index + "].subtitle"}
                                type="text"
                                onChange={formik.handleChange}
                                value={exp.subtitle}
                                label="Subtitle"
                                size="small"
                            />
                            <TextField
                                id="start_date"
                                name={"experiences[" + index + "].start_date"}
                                type="date"
                                onChange={formik.handleChange}
                                value={exp.start_date}
                                label="Start Date"
                                size="small"
                            />
                            <TextField
                                id="end_date"
                                name={"experiences[" + index + "].end_date"}
                                type="date"
                                onChange={formik.handleChange}
                                value={exp.end_date || new Date().toISOString().substring(0, 10)}
                                label="Start Date"
                                size="small"
                            />
                        </Stack>
                    ))}

                    <Button
                        onClick={() => formik.setFieldValue("experiences", formik.values.experiences.concat(dummyExp))}
                    >
                        Add experience
                    </Button>

                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </div>
    );
}
