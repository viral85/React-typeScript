import React, { Fragment } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import { SignUpDetails } from '../../modals/SignUp';
import { mobileNumberMask, regEx } from '../../utils/constants';
import MaskedInput from "react-text-mask";
import * as Yup from 'yup';

interface SignUpFormProps {
    signUp: Function;
}

const SignUpForm = (props: SignUpFormProps) => {
    const { signUp } = props;
    
    const SignupSchema = Yup.object().shape({
        FirstName: Yup.string()
          .required('First Name is Required'),
        MobileNumber: Yup.string()
          .required('Mobile Number is Required')
          .matches(regEx.mobileNumberValidation, 'Invalid Mobile Number'),
        EmailID: Yup.string()
          .email('Invalid Email ID')
          .required('Email ID is Required'),
        TradingName: Yup.string()
          .required('Trading Name is Required'),
      } as SignUpDetails);

    return (
       <Fragment>
           <Formik
              initialValues={{ FirstName: "", MobileNumber: "", EmailID: "", TradingName: "" }}
              validationSchema={SignupSchema}
              onReset={(values, { setSubmitting }) => {
                setSubmitting(true);
              }}
              onSubmit={(values, { setSubmitting }) => {
                signUp(values);
              }}
            >
              {(props) => {
                return (
                  <form onSubmit={props.handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className='form-group'>
                      <label>First Name*</label>
                      <Field type='text' name='FirstName' className='form-control'
                        placeholder='Enter First Name' />
                    <ErrorMessage name='FirstName' className='errorMessage' component='div' />
                    </div>

                    <div className='form-group'>
                      <label>Mobile Number*</label>
                      <Field type='input' name='MobileNumber'
                        render={({ field }) => (
                            <MaskedInput
                              {...field}
                              mask={mobileNumberMask}
                              className='form-control'
                              placeholder='Enter Mobile Number'
                            />
                          )} />
                    <ErrorMessage name='MobileNumber' className='errorMessage' component='div' />
                    </div>

                    <div className='form-group'>
                      <label>Email ID*</label>
                      <Field type='text' name='EmailID' className='form-control'
                        placeholder='Enter Email ID' />
                    <ErrorMessage name='EmailID' component='div' className='errorMessage' />
                    </div>

                    <div className='form-group'>
                      <label>Trading Name*</label>
                      <Field type='text' name='TradingName' className='form-control'
                        placeholder='Enter Trading Name' />
                    <ErrorMessage name='TradingName' component='div' className='errorMessage' />
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
                      Already Registered <a href='#'>sign in?</a>
                    </p>
                  </form>
                );
              }}
            </Formik>
       </Fragment>
    );
}

export default SignUpForm;