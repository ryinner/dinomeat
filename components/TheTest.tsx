'use client'
import { useForm, type SubmitHandler } from "react-hook-form";

interface Inputs {
  image: File;
  alt: string;
}

export function TheTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data, e) => console.log(data, e);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...(register("image"), { required: true })} />
      {errors.image && <span>This field is required</span>}
      <input
        type="text"
        {...register("alt", { required: true, minLength: 3 })}
      />
      {errors.alt && <span>{errors.alt.message}</span>}
      <button type="submit">Save</button>
    </form>
  );
}
