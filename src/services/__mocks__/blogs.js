const blogs = [
  {
    title: 'Hessun blogi',
    author: 'Hessu',
    likes: 2
  },
  {
    title: 'Akun blogi',
    author: 'Aku',
    likes: 5
  }
]

const getAll = () => {
  Promise.resolve(blogs)
}

export default { getAll }