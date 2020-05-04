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
    <div className='main-content' style={{ touchAction: 'none' }}>
      <div className='header py-7 py-lg-8'>
        <Container>
          <div className='header-body text-center mb-7'>
            <Row className='justify-content-center'>
              <Col lg='5' md='6'>
                
                <p className='text-lead text-light'>Upkeep Platform</p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className='mt--8 pb-5'>
        <Row className='justify-content-center'>
          <Col lg='5' md='7'>
            <Card className='bg-secondary shadow border-0'>
              <CardBody className='px-lg-5 py-lg-5'>
                <FinalFrom<{ email: string; password: string }>
                  onSubmit={onSubmit}
                >
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
                              <InputGroup>
                                <Input
                                  {...input}
                                  type='email'
                                  placeholder='Email'
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
                              <InputGroup>
                                <Input
                                  {...input}
                                  placeholder='Password'
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
                        <div className='text-center'>
                          <Button
                            type='submit'
                            className='my-4'
                            color='primary'
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
