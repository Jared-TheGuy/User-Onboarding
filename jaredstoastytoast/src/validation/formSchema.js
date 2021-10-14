import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required("You need this")
        .min(4, "need more than three bud"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Need this too"),
    password: yup
        .string()

        
})

export default formSchema;