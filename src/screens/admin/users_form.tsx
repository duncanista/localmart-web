import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/admin.css';

import { Auth } from '../../fb_app';
import { Api, LMImpl, Validation } from '../../api';
import { LM } from '../../localmart_schema';

import {
  Container, Row, Col,
  Button, Badge,
  Label,
  InputGroup, Input,
  Form, FormGroup, FormFeedback
} from 'reactstrap';
import Toggle from 'react-toggle'

import arrayMutators from 'final-form-arrays'
import { Field as FinalField, Form as FinalForm, FormSpy } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays'

import { diff } from 'deep-object-diff'
import { cloneDeep, isEqual } from 'lodash'
import { Config, FORM_ERROR } from 'final-form'

import { LoadingCube } from '../../components/loading_small';

import { LMNavbar as Navbar } from '../../components/navbar';

interface UsersFormProps {
  user: LM.StoreUser;
  uid: 'new' | string;
}

export type UserFormCommunity = {
  communityShortname: string
}

export type UserFormValues = {
  email: string
  password: string
  passwordConfirm: string
  name: string
  lastname: string
  admin: boolean
  communities: UserFormCommunity[]
}

type UserFormSubmit = Config<UserFormValues>['onSubmit']

const communitiesToForm: (
  communities: string[],
  availableCommunities: LM.Community[]
) => UserFormCommunity[] = (
  communities: string[],
  availableCommunities: LM.Community[]
) => !communities ? availableCommunities.map(({ name: communityName, shortname: communityShortname }) => ({
  communityShortname
})) : Object.values(communities).map(communityShortname => ({
  communityShortname,
}))

const formToCommunities: (
  formCommunities: UserFormCommunity[]
) => string[] = (formCommunities: UserFormCommunity[]) =>
    formCommunities.reduce<string[]>((communities, { communityShortname }) => {
      communities.push(communityShortname)
      return communities
    }, [])



export const UsersForm: FunctionComponent<RouteComponentProps<UsersFormProps>> = ({ navigate, user, uid }) => {
  const adding = uid === 'new';
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState<(LM.StoreUser & LM.idd) | null>(null);
  const [initialFormValues, setInitialFormValues] = useState({
    ... new LMImpl.UserCreationDataImpl(),
    passwordConfirm: '',
    communities: [] as UserFormCommunity[],
  })
  const [passwordSectionShown, setPasswordSectionShown] = useState(adding)

  useEffect(() => {
    ; (async () => {
      let freshFormState
      const communities = await Api.Community.readAll()
      const freshUserForm = {
        ... new LMImpl.UserCreationDataImpl(),
        passwordConfirm: '',
        communities: [] as UserFormCommunity[],
      }
      if (!adding) {
        const storeUser = await Api.User.read(uid!)
        if (!storeUser) navigate!('/')
        freshFormState = {
          ...freshUserForm,
          ...storeUser,
          communities: communitiesToForm(
            storeUser.communities || [], communities
          ),
        }
      } else {
        freshFormState = {
          ...freshUserForm,
          communities: communitiesToForm([], communities),
        }
      }
      console.log(typeof (communities))
      console.log(freshFormState)
      setInitialFormValues(freshFormState)
      setReady(true)
    })()
  }, [adding, navigate, uid])

  const onDelete = async () => {
    setReady(false)
    try {
      await Api.User.delete(uid!)
      navigate!(`${Api.User._collectionPath}`)
    } catch (e) {
      // INJECT ERROR INTO FORM
      setReady(true)
      console.error(e)
    }
    navigate!("../")
  }

  const onSubmit: UserFormSubmit = async formValues => {
    setReady(false)
    const userData = {
      ...formValues,
      communities: formToCommunities(formValues.communities),
    }
    delete userData.passwordConfirm

    try {
      if (adding) {
        await Api.User.create(userData)
      } else {
        const { communities: _, ...userStrings } = userData
        const {
          communities: __,
          passwordConfirm: ___,
          ...originalUserStrings
        } = initialFormValues
        await Api.User.update({
          ...{
            ...diff(originalUserStrings, userStrings),
            communities: userData.communities,
          },
          uid: uid!,
        })
      }
    } catch (e) {
      return { [FORM_ERROR]: e.message || JSON.stringify(e) }
    }
    navigate!("../")
  }

  return !ready ? (
    <LoadingCube />
  ) : (
      <>
        <Container fluid>
          <Navbar user={user} usersActive />
        </Container>

        <Container className="admin-controls">
          <h1>{adding ? `Add a new user` : `Editing user`}</h1>
        </Container>

        <Container>
          <FinalForm<UserFormValues>
            onSubmit={onSubmit}
            validate={({ email, password, passwordConfirm, name, lastname }) => {
              const errors = {} as { [key: string]: string }
              const emailError = Validation.all(
                Validation.required(),
                Validation.isEmail
              )(email)
              if (emailError) errors.email = emailError

              const nameError = Validation.all(
                Validation.required(),
              )(name)
              if (nameError) errors.name = nameError

              const lastnameError = Validation.all(
                Validation.required(),
              )(lastname)
              if (lastnameError) errors.lastname = lastnameError

              if (passwordSectionShown) {
                const passwordError = Validation.all(
                  Validation.required(),
                  Validation.isOfLength(6)
                )(password)

                const passwordConfirmError =
                  Validation.required()(passwordConfirm) ||
                  (password !== passwordConfirm
                    ? 'Passwords do not match'
                    : undefined)

                if (passwordError) errors.password = passwordError
                if (passwordConfirmError) errors.passwordConfirm = passwordConfirmError
              }

              return errors
            }}
            initialValues={initialFormValues}
            mutators={{ ...arrayMutators }}
          >

            {({ handleSubmit, error, dirty, errors }) => (

              <Form onSubmit={handleSubmit} className="admin-form">
                <Row>
                  <Col md={5}>

                    <FinalField
                      name='name'
                      validate={Validation.required()}
                    >
                      {({ input, meta: { error: nameError, touched } }) => (
                        <div className="admin-input">
                          <Label for="name">Name</Label>
                          <InputGroup size="lg">
                            <Input {...input} type="text" name="name" id="name" placeholder="John" invalid={nameError && touched} />
                            {nameError && touched && <FormFeedback>{nameError}</FormFeedback>}
                          </InputGroup>
                        </div>
                      )}

                    </FinalField>

                    <FinalField
                      name='lastname'
                      validate={Validation.required()}
                    >
                      {({ input, meta: { error: lastnameError, touched } }) => (
                        <div className="admin-input">
                          <Label for="lastname">Lastname</Label>
                          <InputGroup size="lg">
                            <Input {...input} type="text" name="lastname" id="lastname" placeholder="Doe" invalid={lastnameError && touched} />
                            {lastnameError && touched && <FormFeedback>{lastnameError}</FormFeedback>}
                          </InputGroup>
                        </div>
                      )}
                    </FinalField>

                    <FinalField
                      name='email'
                      validate={Validation.all(Validation.required(), Validation.isEmail)}
                    >
                      {({ input, meta: { error: emailError, touched } }) => (
                        <div className="admin-input">
                          <Label for="email">Email</Label>
                          <InputGroup size="lg">
                            <Input {...input} type="email" name="email" id="email" placeholder="john@localmart.mx" invalid={emailError && touched} />
                            {emailError && touched && <FormFeedback>{emailError}</FormFeedback>}
                          </InputGroup>
                        </div>
                      )}
                    </FinalField>

                    {passwordSectionShown && (
                      <>
                        <FinalField name='password'  >
                          {({ input, meta: { error: passwordError, touched } }) => (
                            <div className="admin-input">
                              <Label for="password">Password</Label>
                              <InputGroup size="lg">
                                <Input {...input} type="password" name="password" id="password" invalid={passwordError && touched} />
                                {passwordError && touched && <FormFeedback>{passwordError}</FormFeedback>}
                              </InputGroup>
                            </div>
                          )}
                        </FinalField>

                        <FinalField name='passwordConfirm'  >
                          {({ input, meta: { error: passwordConfirmError, touched } }) => (
                            <div className="admin-input">
                              <Label for="passwordConfirm">Confirm password</Label>
                              <InputGroup size="lg">
                                <Input {...input} type="password" name="password" id="password" invalid={passwordConfirmError && touched} />
                                {passwordConfirmError && touched && <FormFeedback>{passwordConfirmError}</FormFeedback>}
                              </InputGroup>
                            </div>
                          )}
                        </FinalField>
                      </>
                    )}
                  </Col>

                  <Col md={{ size: 2, offset: 1 }}>
                    <FinalField name='admin' type='checkbox'>
                      {({ input, form }) => (
                        <div className="admin-input">
                          <Label for="perms">Permissions</Label>
                          <InputGroup size="lg">
                            <Toggle {...input} icons={false} />
                          </InputGroup>
                        </div>
                      )}
                    </FinalField>

                    <FieldArray<UserFormCommunity>
                      name='communities'
                      isEqual={isEqual}
                    >
                      {({ fields: communities }) => (

                        <>
                          <Label for="communities">Communities</Label>
                          {communities.map((communityName, index) => (
                            <FormSpy<UserFormValues>>
                              {({ values, form }) => {
                                const { communityShortname } = values.communities[index]

                                return (
                                  <Badge
                                    className='m-1'
                                    color={true ? 'success' : 'danger'}
                                    onClick={() =>
                                      form.change(`${communityShortname}.authorized`, true)
                                    }
                                  >
                                    {communityShortname}
                                  </Badge>
                                )
                              }}
                            </FormSpy>
                          ))}
                        </>
                      )}
                    </FieldArray>

                  </Col>

                  <Col md={12} className="admin-submit">
                    {dirty && Validation.isObjectEmpty(errors) && !error && (
                      <Button className='success'>
                        {adding ? `Add` : `Save`}
                      </Button>
                    )}
                    {!adding && (
                      <Button onClick={onDelete} className='danger'>
                        Delete
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>

            )}

          </FinalForm>
        </Container>
      </>
    );
}


