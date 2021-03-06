// joo-ju

import '../style.css';
import '../Components/rating/rating.css';
import { FaStar } from 'react-icons/fa';
import React, { Component, useEffect, useState } from 'react';
import Content from '../Components/Content';
import '../Components/button/Button.css';
import '../Components/Content.css';
import '../Components/comment/Comment.css';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import PostViewWriterDate from '../Components/view/PostViewWriterDate';
import PostViewContent from '../Components/view/PostViewContent';
import PostViewTitle from '../Components/view/PostViewTitle';
import axios from 'axios';
import CommentWrite from '../Components/comment/CommentWrite';
import CommentTop from '../Components/comment/CommentTop';
import CommentDetail from '../Components/comment/CommentDetail';
import CommentButtons from '../Components/comment/CommentButtons';

import { useSelector } from 'react-redux';
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
const hName = {
  fontSize: 'small',
  paddingTop: '6px',
  paddingBottom: '5px',
  paddingRight: '7px',
  paddingLeft: '7px',
  marginRight: '10px',
  borderRadius: '3px',
  backgroundColor: '#98B6E4',
  color: 'white',
};
function PostViewPage(props) {
  const { user, hospital } = useSelector(({ user, hospital }) => ({
    user: user.user,
    hospital: hospital.hospital,
  }));
  const _id = props.match.params._id;
  const [commentData, setCommentData] = useState([
    {
      _id: '',
      content: '',
      writer: '',
      post_id: '',
      enrollTime: '',
    },
  ]);
  const [postData, setpostData] = useState([
    {
      _id: '',
      title: '',
      content: '',
      writer: '',
      enrollTime: '',
      score: '',
    },
  ]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  useEffect(async () => {
    try {
      const res = await axios.get('/api/posts/readone/' + _id);
      console.log('res : ', res.data);

      setpostData({
        _id: res.data._id,
        no: res.data.no,
        title: res.data.title,
        content: res.data.content,
        writer: res.data.writer,
        score: res.data.score,
        hospitalName: res.data.hospitalName,
        // dateformat??? ???????????? ???-???-??? ???:???:??? ??? ??????
        enrollTime: dateFormat(res.data.enrollTime, 'yyyy-mm-dd hh:mm:ss'),
      });

      // ?????? ?????? ???????????? 1??? ??????
      const req = axios.put('/api/posts/' + _id, {
        ...res.data,
        view: parseInt(res.data.view) + 1,
      });

      //comments
      const commentRes = await axios.get('/api/comments/read/post/' + _id);
      const _commentData = await commentRes.data.map(
        (cData) => (
          setLastIdx(lastIdx + 1),
          {
            _id: cData._id,
            content: cData.content,
            writer: cData.writer,
            post_id: _id,
            hospitalName: cData.hospitalName,
            // dateformat??? ???????????? ???-???-??? ??? ??????
            enrollTime: dateFormat(cData.enrollTime, 'yyyy-mm-dd hh:mm'),
          }
        ),
      );
      setCommentData(commentData.concat(_commentData));
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const [lastIdx, setLastIdx] = useState(0);


  return (
    <div>
      <Content className="b">
        <PostViewTitle>{postData.title}</PostViewTitle>

        <PostViewWriterDate
          writer={postData.writer}
          date={postData.enrollTime}
        />

        <div className="col-12 m-auto bg-white">
          <div className="">
            <div class="stars ">
             <span style={hName}> {postData.hospitalName}</span>
              <FaStar 
                size="18"
                className={postData.score > 0 && 'clickedstar'}
              />
              <FaStar
                size="18"
                className={postData.score > 1 && 'clickedstar'}
              />
              <FaStar
                size="18"
                className={postData.score > 2 && 'clickedstar'}
              />
              <FaStar
                size="18"
                className={postData.score > 3 && 'clickedstar'}
              />
              <FaStar
                size="18"
                className={postData.score > 4 && 'clickedstar'}
                className="laststar"
              />
              <span></span>
              {postData.score}.0
            </div>
          </div>

          <hr className="w-90" />
          <PostViewContent>{postData.content}</PostViewContent>
          <Link style={{ textDecorationLine: 'none' }} to="/postlistpage">
            <div class="tolist">????????????</div>
          </Link>
        </div>
      </Content>
      <Content>
        {user && <CommentWrite pid={postData._id}>{postData._id}</CommentWrite>}

        {lastIdx !== 0 ? (
          // ???????????? ???????????? ???????????? ????????? .reverse()??? ???????????? ??????
          commentData &&
          commentData.reverse().map(
            (cData) =>
              // ?????? ????????? ???????????? ???????????? ??????
              cData._id !== '' && (
                <div className="  ">
                  <CommentTop
                    writer={cData.writer}
                    time={cData.enrollTime}
                  ></CommentTop>
                  <CommentDetail>{cData.content}</CommentDetail>
                  <CommentButtons>--</CommentButtons>
                  <hr className="w-90" />
                </div>
              ),
          )
        ) : (
          <CommentTop> ????????? ?????? ????????????.</CommentTop>
        )}
      </Content>
    </div>
  );
}
export default PostViewPage;
