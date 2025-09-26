import React from 'react'
import BlogForm from '../../components/cms/BlogForm'
import CMSLayout from '../../components/cms/CMSLayout'

const EditBlog = () => {
  return (
    <CMSLayout>
      <BlogForm mode="edit" />
    </CMSLayout>
  )
}

export default EditBlog