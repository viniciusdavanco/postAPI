import { Component } from 'react';
import './styles.css'
import Posts from '../../components/Posts';

import loadPosts from '../../utils/load-posts';
import Button from '../../components/Button';
import TextInput from '../../components/textInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 18,
    searchValue: ''
  }

  async componentDidMount() {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
    this.loadPosts()
  }

  loadMorePosts = () => {
    console.log('load more posts chamado')
    const {
      page,
      postsPerPage,
      allPosts,
      posts } = this.state;
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? allPosts.filter(posts => { return posts.title.toLowerCase().includes(searchValue.toLowerCase()) }) : posts
    return (
      <section className='container'>
        {!!searchValue && (<h1>Search Value: {searchValue}</h1>)}
        <TextInput seachValue={searchValue} handleChange={this.handleChange}/>
          <Posts posts={filteredPosts} />
        <div className="button-container">
          {!searchValue && (
            <Button disabled={noMorePosts} text='Load More Posts' onClick={this.loadMorePosts} />
          )}
        </div>
      </section>
    )
  }
}


export default Home;
