import CreateBlogPage from '@/pages/CreateBlog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_authenticated/blogs/create')({
  component: CreateBlogPage,
})
