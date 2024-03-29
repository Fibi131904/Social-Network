import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { PostDataType } from '../../../types/types';

type MyPostPropsType={
  posts: Array<PostDataType>
  addPost: (newPostText: string) => void
}

type FormDataType = {
  newMessageText: string
}

const MyPosts = React.memo((props: MyPostPropsType) => {
  let postElements =
    props.posts.map(el => <Post key={el.id} id={el.id} message={el.message} likesCount={el.likesCount} />)

  let onAddPost = (formData: FormDataType) => {
    props.addPost(formData.newMessageText)
  }


  return (
    <div className={styles.postsBlock}>
      <h3> My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className={styles.posts}>
        {postElements}
      </div>
    </div>
  )
})
let maxLength10 = maxLengthCreator(10)

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div >
        <Field name={'newMessageText'} component={Textarea} placeholder={'Enter message'} validate={[required, maxLength10]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}
const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)


export default MyPosts;

