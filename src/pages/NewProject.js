import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { handleNew, handleGet, handleEdit } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";
import { Button, Stack, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function NewProject() {
    const params = useParams();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const formik = useFormik({
        initialValues: {
            title: "",
            stack: "",
            github_link: "",
            start_date: new Date().toISOString().substring(0, 10),
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            stack: Yup.string().required("Required"),
            github_link: Yup.string(),
            start_date: Yup.string(),
            description_path: Yup.string(),
        }),
        onSubmit: (formValues) => {
            const imageFile = document.getElementById("image_input").files[0];
            const previewFile = document.getElementById("preview_input").files[0];
            const mdFile = new Blob([description], { type: "text/plain" });

            const storageRefDescription = ref(
                storage,
                "projects/description/" + formValues.title.toLowerCase().replaceAll(" ", "_")
            );
            const storageRefImage = ref(
                storage,
                "projects/image/" + formValues.title.toLowerCase().replaceAll(" ", "_")
            );
            const storageRefPreview = ref(
                storage,
                "projects/preview/" + formValues.title.toLowerCase().replaceAll(" ", "_")
            );

            const descriptionUpload = uploadBytes(storageRefDescription, mdFile);
            const imageUpload = imageFile ? uploadBytes(storageRefImage, imageFile) : null;
            const previewUpload = previewFile ? uploadBytes(storageRefPreview, previewFile) : null;

            console.log("Hei 0");
            Promise.all([descriptionUpload, imageUpload, previewUpload]).then((uploadValues) => {
                console.log("Hei 1");
                const descriptionDownloadURL = uploadValues[0] ? getDownloadURL(uploadValues[0].ref) : null;
                const imageDownloadURL = uploadValues[1] ? getDownloadURL(uploadValues[1].ref) : null;
                const previewDownloadURL = uploadValues[2] ? getDownloadURL(uploadValues[2].ref) : null;

                console.log("Hei 2");
                Promise.all([descriptionDownloadURL, imageDownloadURL, previewDownloadURL]).then((urlValues) => {
                    const submitValues = {
                        ...formValues,
                        descriptionURL: urlValues[0],
                        imageURL: urlValues[1] || image,
                        previewURL: urlValues[2] || preview,
                    };
                    console.log("Hei 3");
                    if (params.id) {
                        handleEdit("projects", params.id, submitValues).then((projectId) =>
                            navigate("/projects/" + projectId)
                        );
                    } else {
                        handleNew("projects", submitValues).then((projectId) => navigate("/projects/" + projectId));
                    }
                });
            });
        },
    });

    const { setValues } = formik;
    useEffect(() => {
        if (params.id) {
            handleGet("projects", params.id)
                .then((project) => {
                    if (project) {
                        setValues(project);
                        setImage(project.imageURL);
                        setPreview(project.previewURL);
                        fetch(project.descriptionURL).then((response) =>
                            response.text().then((md) => setDescription(md))
                        );
                    }
                })
                .catch((err) => console.log(err.message));
        }
        document.getElementById("image_input").onchange = (e) => {
            const file = document.getElementById("image_input").files[0];
            if (file) {
                setImage(URL.createObjectURL(file));
            }
        };
        document.getElementById("preview_input").onchange = (e) => {
            const file = document.getElementById("preview_input").files[0];
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        };
    }, [params.id, setValues]);

    return (
        <div>
            <h1>Add new project</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        id="title"
                        name="title"
                        type="text"
                        label="Title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        size="small"
                    />
                    {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

                    <TextField
                        id="stack"
                        name="stack"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.stack}
                        label="Stack"
                        size="small"
                    />
                    {formik.touched.stack && formik.errors.stack ? <div>{formik.errors.stack}</div> : null}

                    <label>Image</label>
                    <input id="image_input" type="file" accept="image/*" />
                    {image && <img style={{ height: 100 }} src={image} alt="Project"></img>}

                    <label>Preview</label>
                    <input id="preview_input" type="file" accept="image/*" />
                    {preview && <img style={{ height: 100 }} src={preview} alt="Project preview"></img>}

                    <TextField
                        id="github_link"
                        name="github_link"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.github_link}
                        label="Github URL"
                        size="small"
                    />
                    {formik.touched.github_link && formik.errors.github_link ? (
                        <div>{formik.errors.github_link}</div>
                    ) : null}

                    <TextField
                        id="start_date"
                        name="start_date"
                        type="date"
                        onChange={formik.handleChange}
                        value={formik.values.start_date}
                        label="Start date"
                        size="small"
                    />
                    {formik.touched.github_link && formik.errors.github_link ? (
                        <div>{formik.errors.github_link}</div>
                    ) : null}

                    <Grid2 container spacing={2}>
                        <Grid2 xs={6} sx={{ pl: 0 }}>
                            <TextField
                                id="description_md"
                                name="description_md"
                                multiline
                                rows={10}
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Description"
                            />
                        </Grid2>
                        <Grid2 xs={6}>
                            <ReactMarkdown>{description}</ReactMarkdown>
                        </Grid2>
                    </Grid2>
                    {formik.touched.description_md && formik.errors.description_md ? (
                        <div>{formik.errors.description_md}</div>
                    ) : null}

                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </div>
    );
}
