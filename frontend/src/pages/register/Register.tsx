import { Container, Grid, Button, Box, Typography } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "./FormTextField";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormValues {
    email: string;
    password: string;
    name: string;
    phone: string;
}


export default function Login() {
    const history = useNavigate()

    const validationSchema = yup.object().shape({
        email: yup.string().required("Required"),
        password: yup.string().required("Required"),
        name: yup.string().required("Required"),
        phone: yup.string().required("Required")
    });

    const handleSubmit = async (values: any) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", values)
            history("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container maxWidth="md">
            <Box mb={3} p={2}>
                <Typography
                    align="center"
                    variant="h5"
                    style={{ lineHeight: 1.25, marginBottom: 16 }}
                >
                    Register form
                </Typography>
            </Box>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    name: "",
                    phone: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(
                    values: FormValues,
                    formikHelpers: FormikHelpers<FormValues>
                ) => {
                    handleSubmit(values)
                }}
            >
                {(formikProps: FormikProps<FormValues>) => (
                    <Form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="name"
                                    label="Name"
                                    size="small"
                                    component={FormTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="phone"
                                    label="Phone"
                                    size="small"
                                    component={FormTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    label="Email"
                                    size="small"
                                    component={FormTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="password"
                                    label="Password"
                                    size="small"
                                    component={FormTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    size="large"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
