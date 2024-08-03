import Validator from "fastest-validator";

const v = new Validator;

const schema = {
    name: {
        type: "string",
        minLength: 3,
        maxLength: 50,
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

const result = v.compile(schema)

export default result