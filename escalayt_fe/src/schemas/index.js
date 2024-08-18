import * as yup from "yup";

// Password rules: at least one digit, one lowercase, one uppercase, and at least 5 characters
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// Password rules: at least one digit, one lowercase, and at least 5 characters
// const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;

// Password rules: at least 5 characters
const passwordRules = /^.{5,}$/;

// password - min - 3
export const basicSCHEMA = yup.object().shape({
    // email: yup.string().email().required(),
    username: yup.string().required("Required"),
    password: yup
    .string()
    // .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),

});


// Signup schema: includes email and password confirmation
export const signupSCHEMA = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required"),
    username: yup.string().required("Required"),
    password: yup
        .string()
        .matches(passwordRules, { message: "Password must be at least 5 characters long." })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Required"),
        firstname: yup.string().required("Required"),
        lastname: yup.string().required("Required"),
        phone: yup.string().nullable(), // Phone number is not required
});

export const createUserSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required"),
    fullName: yup.string().required("Required"),
    jobTitle: yup.string().required("Required"),
})