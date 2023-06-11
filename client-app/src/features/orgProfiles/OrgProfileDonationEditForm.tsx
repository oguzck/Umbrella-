import { Form, Formik } from 'formik';
import React from 'react'
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';


interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer( function OrgProfileDonationEditForm({setEditMode}:Props) {
    const { orgProfileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik initialValues={{ donationIban: profile?.donationIban, donationDescription: profile?.donationDescription }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                donationIban: Yup.string().required(),
                donationDescription: Yup.string().required()
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Donation Iban'
                        name='donationIban' />
                    <MyTextArea rows={3} placeholder='Donation Description'
                        name='donationDescription' />
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
