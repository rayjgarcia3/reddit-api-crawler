import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  domain: { type: String, default: '' },
  thumbnail_width: { type: String, default: '' },
  thumbnail_height: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  subreddit: { type: String, default: '' },
  selftext_html: { type: String, default: '' },
  is_reddit_media_domain: { type: String, default: '' },
  redditId: { type: String, default: '' },
  title: { type: String, default: '' },
  over_18: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
  subreddit_id: { type: String, default: '' },
  name: { type: String, default: '' },
  permalink: { type: String, default: '' },
  url: { type: String, default: '' },
  author: { type: String, default: '' },
  subreddit_name_prefixed: { type: String, default: '' },
  local_url: { type: String, default: '' },
  preview: { type: Object },
  added_date: { type: Date, default: Date.now },
});

export default mongoose.models.Submission ||
  mongoose.model('Submission', submissionSchema);
