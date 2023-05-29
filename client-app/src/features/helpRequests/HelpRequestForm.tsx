import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Link, useNavigate } from 'react-router-dom'
import MyDateInput from '../../app/common/form/MyDateInput'
import MySelectInput from '../../app/common/form/MySelectInput'
import MyTextArea from '../../app/common/form/MyTextArea'
import { categoryOptions } from '../../app/common/options/categoryOptions'
import * as Yup from 'yup';
import { useStore } from '../../app/stores/store'
import { HelpRequestFormValues } from '../../app/models/HelpRequest'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import modalStore from '../../app/stores/modalStore'
import Success from '../../app/common/form/Success'

export default observer( function HelpRequestForm() {
    const {helpRequestStore,modalStore} = useStore()
    const {loading,createHelpRequest} = helpRequestStore
    const navigate = useNavigate();
    const initialValues = {
        id : '',
        title : '',
        description : '',
        contactNumber : '',
        adress : ''
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('The Help Request title is required'),
        description: Yup.string().required('The Help Request description  is required'),
        contactNumber : Yup.string().required("The Phone Number is required"),
        adress : Yup.string().required("The Adress is required")
    })
    function handleFormSubmit(helpRequest : HelpRequestFormValues) {
            helpRequest.id = uuid();
            createHelpRequest(helpRequest).then(() => modalStore.openModal(<Success />))
    }
  return (
    <Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={initialValues} onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MyTextArea rows={3} placeholder='Adress' name='adress' />
                        <Header content='Please Enter Your Phone Number Without 0 at the beginning' sub color='teal' />
                        <MyTextInput name='contactNumber' placeholder='Phone Number' />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}

            </Formik>
        </Segment>
  )
})
