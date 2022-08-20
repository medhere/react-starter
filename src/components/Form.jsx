import { useForm } from "react-hook-form";
import { decodeToken, isExpired } from "react-jwt";

    // const { register, handleSubmit, formState:{errors} } = useForm();
    const { register, setError, trigger, clearErrors, handleSubmit, setValue, getValues, setFocus, reset, watch, formState } = useForm();
	const { errors, isDirty, dirtyFields, touchedFields, isSubmitted, isSubmitSuccessful, isSubmitting, submitCount, isValid, isValidating } = formState;

    // const onSubmit = (data, e) => {console.log(data, e); var multipart=new FormData(e.target)}
    // const onError = (errors, e) => console.log(errors, e);
    // <form onSubmit={handleSubmit(onSubmit,onError)} > 
    // {!!errors.email && errors?.email.message}
    // error={errors.example && Boolean(errors.example)}
    // helperText={errors.example && `${errors.example['type']}:${errors.example['message']}}		
    // decodeToken(token)
    // isExpired(token)
