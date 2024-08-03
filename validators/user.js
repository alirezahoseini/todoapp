import Validator from "fastest-validator";

const v = new Validator;

const signupSchema = {
    name: {
        type: "string",
        min: 3,
        max: 20,
    },
    email: {
        type: "string",
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: "string",
        min: 4,
        max: 20,
    }
}

const signupValidator = v.compile(signupSchema);


const signinSchema = {
    email: {
        type: "string",
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: "string",
        min: 4,
        max: 20,
    }
}

const signinValidator = v.compile(signinSchema)

export {signupValidator, signinValidator}