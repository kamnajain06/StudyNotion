import React from 'react'
import ContactForm from '../../common/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='text-richblack-5 flex flex-col justify-center  items-center mt-[100px]'>
        <h2 className='text-4xl font-bold '>Get in Touch</h2>
        <h4 className='mt-3 text-richblack-200'>We'd love to here for you, Please fill out this form.</h4>
        <div className='mt-[30px]'>
            <ContactForm></ContactForm>
        </div>
    </div>
  )
}

export default ContactFormSection