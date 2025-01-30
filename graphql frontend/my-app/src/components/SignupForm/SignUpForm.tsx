import React from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css"; // Import CSS module
import { useMutation, gql } from '@apollo/client';
type SignupFormData = {
  name: string;
  email: string;
  password: string;
};
const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    Signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Signup: React.FC = () => {
    const [signup] = useMutation(SIGNUP_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit =async (data: SignupFormData) => {
    console.log("Signup Data:", data);
    const response = await signup({  variables: { name: data.name, email: data.email, password: data.password } });
   console.log("Response:", response);

  };

  return (
    <div className={styles.signupContainer}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input {...register("name", { required: "Name is required" })} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email format" },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
