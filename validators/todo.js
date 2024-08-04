import Validator from "fastest-validator";

const v = new Validator();

const schema = {
    title: {
        type: 'string',
        min: 3,
        max: 100
    },
    isComplated: {
        type: "boolean",
        optional: true
    }
}

const result = v.compile(schema);

export default result