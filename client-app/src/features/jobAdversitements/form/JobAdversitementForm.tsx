import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Button, Checkbox } from 'semantic-ui-react'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MyTextInput from '../../../app/common/form/MyTextInput'
import * as Yup from 'yup';
import { JobAdversitementsFormValues } from '../../../app/models/jobAdversitement'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import Success from '../../../app/common/form/Success'
import { values } from 'mobx'

export default observer(function JobAdversitementForm() {
    const { jobAdverStore, modalStore } = useStore()
    const { loading, createJobAdversitement } = jobAdverStore
    const validationSchema = Yup.object({
        title: Yup.string().required('The job title is required'),
        description: Yup.string().required('The job description  is required'),
        city: Yup.string().required('The city is required'),
        skills: Yup.string().required("The job skills  is required"),
        isPaid: Yup.bool().required("isPaid is required")

    })
    const initialValues = {
        id: '',
        title: '',
        description: '',
        skills: '',
        city: '',
        isPaid: false

    }
    function handleFormSubmit(jobAdversitement: JobAdversitementsFormValues) {
        jobAdversitement.id = uuid();
        createJobAdversitement(jobAdversitement)
    }
    return (
        <><Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={initialValues} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty, values, setFieldValue }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header content='Job Adversitement' sub color='teal' />
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MyTextInput name='city' placeholder='City' />
                        <Header content='Describe the requirements for your job adversitement' sub color='teal' />
                        <MyTextArea rows={3} placeholder='Skills' name='skills' />
                        <Header content='Please select whether voluntarily or paid job' sub color='teal' />
                        <Checkbox
                            label='Is Paid'
                            name='isPaid'
                            checked={values.isPaid}
                            onChange={() => setFieldValue('isPaid', !values.isPaid)} />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/organizationPanel' floated='right' type='button' content='Cancel' />
                    </Form>
                )}

            </Formik>
        </Segment></>
    )
})
