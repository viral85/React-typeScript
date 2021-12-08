import React, { Component } from "react";
import Layout from "../../components/Layout";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { Formik, Field, ErrorMessage } from "formik";
import Col from "react-bootstrap/esm/Col";
import Label from "react-bootstrap/FormLabel";
import {
  GetQuestionListService,
  AskQuestionService,
} from "../../services/services";
import { QuestionDetails } from "../../modals/Question";
import * as Yup from "yup";
import { mobileNumberMask, regEx } from "../../utils/constants";
import MaskedInput from "react-text-mask";
import { unMaskMobileNumber } from "../../utils/common";

interface GeneralInquiryState {
  questionList: any;
}

class GeneralInquiry extends Component<{}, GeneralInquiryState> {
  UNSAFE_componentWillMount() {
    this._getQuestionList();
  }

  _getQuestionList = async () => {
    const questList = await GetQuestionListService();
    if (questList) {
      this.setState({ questionList: questList.data });
    }
  };

  _askQuestion = async (values: QuestionDetails) => {
    values.MobileNumber = unMaskMobileNumber(values.MobileNumber);
    const questList: any = await AskQuestionService(values);
    if (questList) {
      alert(questList.message);
    }
  };

  GeneralInquirySchema = Yup.object().shape({
    Name: Yup.string().required("First Name is Required"),
    MobileNumber: Yup.string()
      .required("Mobile Number is Required")
      .matches(regEx.mobileNumberValidation, "Invalid Mobile Number"),
    // UserID: Yup.string()
    //   .required('Email ID is Required'),
    // ProductID: Yup.string()
    //   .required('Trading Name is Required'),
    QuestionID: Yup.string().required("Question is Required"),
    CompanyName: Yup.string().required("Company Name is Required"),
    // Comments: Yup.string()
    //   .required('Comments is Required'),
  } as QuestionDetails);

  render() {
    return (
      <>
        <Card>
          <Card.Header>General Inquiry Page</Card.Header>
          <Card.Body>
            <Card.Title>Ask Question</Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-center">
                <div className="col-md-8">
                  <Formik
                    initialValues={
                      {
                        UserID: "",
                        ProductID: "",
                        QuestionID: "",
                        Name: "",
                        MobileNumber: "",
                        CompanyName: "",
                        Comments: "",
                      } as QuestionDetails
                    }
                    validationSchema={this.GeneralInquirySchema}
                    onSubmit={(values, { setSubmitting }) => {
                      this._askQuestion(values);
                    }}
                  >
                    {(props) => {
                      return (
                        <form onSubmit={props.handleSubmit}>
                          <Row>
                            <Label column lg={2}>
                              First Name*
                            </Label>
                            <Col>
                              <Field
                                type="text"
                                name="Name"
                                className="form-control"
                                placeholder="Enter First Name"
                              />
                              <ErrorMessage
                                name="Name"
                                className="errorMessage"
                                component="div"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label column lg={2}>
                              Question*
                            </Label>
                            <Col>
                              <Field
                                type="text"
                                name="QuestionID"
                                className="form-control"
                                placeholder="Enter Question"
                                component="select"
                              >
                                <option value="">Select Question</option>
                                {this.state &&
                                  this.state.questionList &&
                                  this.state.questionList.map((question) => {
                                    return (
                                      <option
                                        key={question.id}
                                        value={question.id}
                                      >
                                        {question.question}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <ErrorMessage
                                name="QuestionID"
                                className="errorMessage"
                                component="div"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label column lg={2}>
                              Company Name*
                            </Label>
                            <Col>
                              <Field
                                type="text"
                                name="CompanyName"
                                className="form-control"
                                placeholder="Enter Company Name"
                              />
                              <ErrorMessage
                                name="CompanyName"
                                className="errorMessage"
                                component="div"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label column lg={2}>
                              Mobile Number*
                            </Label>
                            <Col>
                              <Field
                                type="input"
                                name="MobileNumber"
                                render={({ field }) => (
                                  <MaskedInput
                                    {...field}
                                    mask={mobileNumberMask}
                                    className="form-control"
                                    placeholder="Enter Mobile Number"
                                  />
                                )}
                              />
                              <ErrorMessage
                                name="MobileNumber"
                                className="errorMessage"
                                component="div"
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label column lg={2}>
                              Comment
                            </Label>
                            <Col>
                              <Field
                                component="textarea"
                                rows="3"
                                name="Comments"
                                className="form-control"
                                placeholder="Enter Comments"
                              />
                              <ErrorMessage
                                name="Comments"
                                className="errorMessage"
                                component="div"
                              />
                            </Col>
                          </Row>
                          <br />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={props.isSubmitting}
                          >
                            Submit
                          </button>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            You will get reply within 2 days.
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default GeneralInquiry;
