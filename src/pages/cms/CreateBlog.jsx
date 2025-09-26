import React from 'react'
import BlogForm from '../../components/cms/BlogForm'
import CMSLayout from '../../components/cms/CMSLayout'

const CreateBlog = () => {
  return (
    <CMSLayout>
      <BlogForm mode="create" />
    </CMSLayout>
  )
}

export default CreateBlog