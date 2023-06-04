import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Checkbox, Header, Segment } from 'semantic-ui-react'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom'
import { ApplicationFormValues } from '../../../app/models/applications'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'


export default observer(function ApplicationForm() {
  const { id } = useParams();
  const {jobAdverStore} = useStore();
  const {loading,applyJob} = jobAdverStore

  const validationSchema = Yup.object({
    coverLetter: Yup.string().required('The cover letter is required'),
    educationLevel: Yup.string().required('The education level  is required'),
  })
  const initialValues = {
    id: '',
    coverLetter: '',
    educationLevel: '',

  }
  function handleFormSubmit(application: ApplicationFormValues) {
    application.id = uuid();
    applyJob(id!,application)
  }
  return (
    <>
      <Segment clearing>
      <Header content='Describe your education level and cover letter' sub color='teal' />
        <Formik validationSchema={validationSchema} enableReinitialize initialValues={initialValues} onSubmit={values => handleFormSubmit(values)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
              <MyTextInput name='educationLevel' placeholder='Education Level' />
              <MyTextArea rows={3} placeholder='Cover Letter' name='coverLetter' />
              <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
              <Button as={Link} to={`/jobadversitements/${id}`} floated='right' type='button' content='Cancel' />
            </Form>
          )}

        </Formik>
      </Segment>
    </>
  )
})
