//joo-ju
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

mongoose.set('useCreateIndex', true);
autoIncrement.initialize(mongoose.connection);

const { Schema } = mongoose;
// const {
//   Types: { ObjectId },
// } = Schema;

const PostSchema = new Schema({
  // _id: String,
  reservation: {
    type: String,
  },
  no: {
    type: Number,
  }, // auto increment
  title: {
    type: String,
  }, // 글 제목
  content: {
    type: String,
  }, // 글 내용
  view: {
    type: Number,
    default: 0,
  }, // 조회 수
  tags: {
    type: String,
  }, // 공지, 알림 등 - 문자열로 이루어진 배열
  score: {
    type: Number,
  },
  writer: {
    type: String,
  },
  hospitalName: {
    type: String,
  }, // 진료받은 병원의 _id 저장
  enrollTime: {
    type: Date,
    default: Date.now,
  },
  // deleteTime: Date,
});

PostSchema.plugin(autoIncrement.plugin, {
  model: 'Post',
  field: 'no',
  startAt: 1,
  increment: 1,
});

// 모델 생성
const Post = mongoose.model('Post', PostSchema);

export default Post;
