import React, { FunctionComponent } from 'react'
import { Field as FinalField, Form as FinalFrom } from 'react-final-form'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form as RSForm,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Row,
} from 'reactstrap'

import { RouteComponentProps } from '@reach/router'
import Lottie from 'react-lottie'
import * as animationData from '../assets/animations/cube.json'
import '../css/login.css';

import { Config, FORM_ERROR } from 'final-form'
import { Api, Validation } from '../api'

type LoginFormValues = { email: string; password: string }
type OnLoginFormSubmit = Config<LoginFormValues>['onSubmit']

export const Login: FunctionComponent<RouteComponentProps> = props => {
  const onSubmit: OnLoginFormSubmit = async ({ email, password }) => {
    try {
      await Api.Auth.signIn(email, password)
    } catch (error) {
      return { [FORM_ERROR]: error.message }
    }
  }

  return (
    <>
      <Container className="login">
        <div className="login-logo">
          <h1>LocalMart</h1>
          <p>Log in</p>
        </div>

        <Col md={{ size: 6, offset: 3 }}>
          <FinalFrom<{ email: string; password: string }> onSubmit={onSubmit}>
            {({
              handleSubmit,
              submitting,
              submitError,
              submitSucceeded,
              submitFailed,
              dirtySinceLastSubmit,
            }) => (
                <RSForm role='form' onSubmit={event => handleSubmit(event)}>
                  <FinalField<string>
                    name='email'
                    validate={Validation.all(
                      Validation.required('an email'),
                      Validation.isEmail
                    )}
                  >
                    {({ input, meta: { error, touched } }) => (
                      <FormGroup className='mb-3'>
                        <InputGroup size="lg">
                          <Input
                            {...input}
                            type='email'
                            placeholder='john@localmart.mx'
                            autoComplete='email'
                            invalid={error && touched}
                          />
                          {error && touched && (
                            <FormFeedback>{error}</FormFeedback>
                          )}
                        </InputGroup>
                      </FormGroup>
                    )}
                  </FinalField>
                  <FinalField
                    name='password'
                    validate={Validation.required('a password')}
                  >
                    {({ input, meta: { error, touched } }) => (
                      <FormGroup>
                        <InputGroup size="lg">
                          <Input
                            {...input}
                            placeholder='super secret password'
                            type='password'
                            autoComplete='password'
                            invalid={error && touched}
                          />
                          {error && touched && (
                            <FormFeedback>{error}</FormFeedback>
                          )}
                        </InputGroup>
                      </FormGroup>
                    )}
                  </FinalField>

                  {(submitting || submitSucceeded) && (
                    <div className='d-flex flex-fill align-items-center justify-content-center'>
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: (animationData as any).default,
                        }}
                        height={100}
                        width={100}
                      />
                    </div>
                  )}
                  {submitError && (
                    <Alert color='danger'>{submitError}</Alert>
                  )}
                  <div className='align-right'>
                    <Button
                      type='submit'
                      className='login-button'
                      disabled={
                        submitting ||
                        submitSucceeded ||
                        (submitFailed && !dirtySinceLastSubmit)
                      }
                    >
                      Log In
                    </Button>
                  </div>
                </RSForm>
              )}
          </FinalFrom>
        </Col>
      </Container>
    </>
  )
}
