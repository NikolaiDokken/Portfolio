import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/admin.css";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../utils/firebase";

export default function AdminLogin() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((credentials) => console.log(credentials.user))
                .catch((err) => console.log(err.message));
        },
    });
    return (
        <div>
            <h2>Login as Admin</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}

                <label>Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
