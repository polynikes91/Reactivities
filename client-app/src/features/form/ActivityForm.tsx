import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Segment, Header } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../app/common/form/TextInput';
import TextArea from '../../app/common/form/TextArea';
import SelectInput from '../../app/common/form/SelectInput';
import { categoryOptions } from '../../app/common/options/categoryOptions';
import DateInput from '../../app/common/form/DateInput';
import { Activity } from '../../app/models/activity';

export default observer(function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: new Date(),
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])


    function handleFormSubmit(activity: Activity) {
        if(activity.id.length === 0){
            let newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else{
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return(<LoadingComponent content='Loading activity...'/>);

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
            validationSchema={validationSchema}
            enableReinitialize initialValues={activity}
            onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isSubmitting ,dirty, isValid}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <TextInput placeholder='Title' name='title' />
                    <TextArea rows={3} placeholder='Description' name="description"/>
                    <SelectInput options={categoryOptions} placeholder='Category' name="category"/>
                    <DateInput placeholderText='Date' name="date" showTimeSelect timeCaption='time' dateFormat='MMMM, d yyyy h:mm aa'/>
                    <Header content='Location Details' sub color='teal' />
                    <TextInput placeholder='City' name="city"/>
                    <TextInput placeholder='Venue' name="venue"/>
                    <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                </Form>)}
            </Formik>
            
        </Segment>
    )
})