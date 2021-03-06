import Post from '../../models/post';
import mongoose from 'mongoose';

export const write = async (ctx) => {
  const { title, content, tags, view, score, writer, reservation , hospitalName} = ctx.request.body;

  const post = new Post({
    title,
    content,
    tags,
    view,
    score,
    writer,
    reservation,
    hospitalName,
  });
  try {
    await post.save();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = post;
};

export const readOne = async (ctx) => {
  const { _id } = ctx.params; // id로 하면 안됨.. _id로 해야 됨..

  try {
    const posts = await Post.findById(_id).exec();
    if (!posts) {
      ctx.status = 404;
      return;
    }
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  try {
    const posts = await Post.find().sort({ _id: -1 }).exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const readWriter = async (ctx) => {
  const { writer } = ctx.params; // id로 하면 안됨.. _id로 해야 됨..

  try {
    const posts = await Post.find({ writer: writer }).exec();
    if (!posts) {
      ctx.status = 404;
      return;
    }
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const readHospital = async (ctx) => {
  const { hospitalName } = ctx.params; 

  try {
    const posts = await Post.find({ hospitalName: hospitalName }).exec();
    if (!posts) {
      ctx.status = 404;
      return;
    }
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const update = async (ctx) => {
  const _id = ctx.params;
  let post;
  try {
    post = await Post.updateOne(_id, ctx.request.body, {
      upsert: true,
      new: true,
    }).exec();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = post;
};
