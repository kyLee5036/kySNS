import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const imageInput = useRef();

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      return alert('掲示文を作成してください。');
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i);
    });
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click(); 
  }, [imageInput.current]);

  const onRemoveImage = useCallback( index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index,
    })
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/fomr-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="何がありますか？！" value={text} onChange={onChangeText} />  
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload} >画像アップロード</Button>
        <Button type="primary" style={{ float : 'right'}} htmlType="submit" loading={isAddingPost} >アップロード</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-black' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width : '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>削除</Button>
            </div>
          </div>
        ))}  
      </div>  
  </Form>
  )
}

export default PostForm;