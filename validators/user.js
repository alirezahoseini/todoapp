import Validator from "fastest-validator";

const v = new Validator;

const schema = {
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

const result = v.compile(schema)

export default result