import React from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.css"; // Import CSS module
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation, gql } from '@apollo/client';

type LoginFormData = {
    id: string;
  email: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
     Signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const LoginForm: React.FC = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Data:", data);
    try {
    
        const response=  await login({ variables: { email: data.email, password: data.password } });
   console.log("Response:", response);
   localStorage.setItem('User', JSON.stringify(response.data.Signin));
   
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        <button type="submit"  className={styles.submitButton}><a href="/login" ></a></button>
      </form>
    </div>
  );
};

export default LoginForm;
