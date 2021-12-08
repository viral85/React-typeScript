import React, { Fragment } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import { LoginDetails } from "../../modals/Login";
import * as Yup from 'yup';

interface LoginFormProps {
    login: Function;
}

const LoginForm = (props: LoginFormProps) => {
    const { login } = props;

    const LogInSchema = Yup.object().shape({
      UserName: Yup.string()
        .required('User Name is Required'),
      Password: Yup.string()
        .required('Password is Required'),
    } as LoginDetails);

    return (
       <Fragment>
           <Formik
              initialValues={{ UserName: "", Password: "" }}
              validationSchema={LogInSchema}
              onReset={(values, { setSubmitting }) => {
                setSubmitting(true);
              }}
              onSubmit={(values, { setSubmitting }) => {
                login(values);
                setTimeout(() => setSubmitting(false), 2000);
              }}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <h3>Sign In</h3>

                    <div className='form-group'>
                      <label>User Name</label>
                      <Field type='text' name='UserName' className='form-control'
                        placeholder='Enter User Name' />
                    <ErrorMessage className='errorMessage' name='UserName' component='div' />
                    </div>

                    <div className='form-group'>
                      <label>Password</label>
                      <Field type='password' name='Password' className='form-control'
                        placeholder='Enter Password' />
                    <ErrorMessage className='errorMessage' name='Password' component='div' />
                    </div>

                    <div className='form-group'>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customCheck1'
                        />
                        <label
                          className='custom-control-label'
                          htmlFor='customCheck1'
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <button
                        onClick={props.handleReset}
                        disabled={props.isSubmitting}
                        type='button'
                        className='btn btn-outline-danger btn-block'
                      >
                        Reset
                      </button>

                    <button type='submit' className='btn btn-primary btn-block' disabled={props.isSubmitting}>
                      Submit
                    </button>
                    <p className='forgot-password text-right'>
                      Forgot <a href='#'>password?</a>
                    </p>
                  </form>
                );
              }}
            </Formik>
       </Fragment>
    );
}

export default LoginForm;