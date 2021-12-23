import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    handleNew,
    handleGet,
    handleEdit,
    getFileFromStorage,
} from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import "../styles/admin.css";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { storage } from "../utils/firebase";

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
            description_path: "",
            github_link: "",
            start_date: new Date().toISOString().substring(0, 10),
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            stack: Yup.string().required("Required"),
            github_link: Yup.string().required("Required"),
            start_date: Yup.string(),
            description_path: Yup.string(),
        }),
        onSubmit: (values) => {
            const imageFile = document.getElementById("image_input").files[0];
            const previewFile =
                document.getElementById("preview_input").files[0];

            const submitValues = {
                ...values,
                description_path:
                    "projects/description/" +
                    values.title.toLowerCase().replaceAll(" ", "_") +
                    ".md",
                image: imageFile
                    ? "projects/image/" +
                      values.title.toLowerCase().replaceAll(" ", "_") +
                      "." +
                      imageFile.type.split("/")[1]
                    : values.image,
                preview: previewFile
                    ? "projects/preview/" +
                      values.title.toLowerCase().replaceAll(" ", "_") +
                      "." +
                      previewFile.type.split("/")[1]
                    : values.preview,
            };
            const mdFile = new Blob([description], { type: "text/plain" });
            const storageRefDescription = ref(
                storage,
                submitValues.description_path
            );
            const storageRefImage = ref(storage, submitValues.image);
            const storageRefPreview = ref(storage, submitValues.preview);
            if (params.id) {
                handleEdit("projects", params.id, submitValues).then(
                    (projectId) => {
                        const descriptionUpload = uploadBytes(
                            storageRefDescription,
                            mdFile
                        );
                        const imageUpload = imageFile
                            ? uploadBytes(storageRefImage, imageFile)
                            : null;

                        const previewUpload = previewFile
                            ? uploadBytes(storageRefPreview, previewFile)
                            : null;

                        Promise.all([
                            descriptionUpload,
                            imageUpload,
                            previewUpload,
                        ]).then((values) => {
                            navigate("/projects/" + projectId);
                        });
                    }
                );
            } else {
                handleNew("projects", submitValues).then((projectId) => {
                    const descriptionUpload = uploadBytes(
                        storageRefDescription,
                        mdFile
                    );
                    const imageUpload = uploadBytes(storageRefImage, imageFile);
                    const previewUpload = uploadBytes(
                        storageRefPreview,
                        previewFile
                    );

                    Promise.all([
                        descriptionUpload,
                        imageUpload,
                        previewUpload,
                    ]).then((values) => {
                        navigate("/projects/" + projectId);
                    });
                });
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
                        if (project.description_path) {
                            getFileFromStorage(project.description_path)
                                .then((url) =>
                                    fetch(url).then((response) =>
                                        response
                                            .text()
                                            .then((md) => setDescription(md))
                                    )
                                )
                                .catch((err) => console.log(err.message));
                        }
                        if (project.image) {
                            const imageRef = ref(storage, project.image);
                            getDownloadURL(imageRef)
                                .then((url) => setImage(url))
                                .catch((err) => console.log(err.message));
                        }
                        if (project.preview) {
                            const imageRef = ref(storage, project.preview);
                            getDownloadURL(imageRef)
                                .then((url) => setPreview(url))
                                .catch((err) => console.log(err.message));
                        }
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

                <label>Image</label>
                <input id="image_input" type="file" accept="image/*" />
                <img style={{ height: 100 }} src={image} alt="Project"></img>

                <label>Preview</label>
                <input id="preview_input" type="file" accept="image/*" />
                <img
                    style={{ height: 100 }}
                    src={preview}
                    alt="Project preview"
                ></img>

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
                <div style={{ display: "flex" }}>
                    <textarea
                        name="description_md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <div style={{ flex: 0.01 }} />
                    <div style={{ flex: 1 }}>
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                </div>
                {formik.touched.description_md &&
                formik.errors.description_md ? (
                    <div>{formik.errors.description_md}</div>
                ) : null}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
