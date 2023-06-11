import { Form, Formik } from 'formik';
import React from 'react'
import { Button } from 'semantic-ui-react';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';


interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer( function OrgProfileEditForm({setEditMode}:Props) {
    const { orgProfileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik initialValues={{ displayName: profile?.displayName, description: profile?.description,phoneNumber : profile?.phoneNumber }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name'
                        name='displayName' />
                    <MyTextInput placeholder='Phone Number'
                        name='phoneNumber' />
                    <MyTextArea rows={3} placeholder='Add your bio'
                        name='description' />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>

            )}


        </Formik>
    )
})
