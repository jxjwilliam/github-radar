const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GithubSchema = new Schema({
  name: String,
  stars: String,
  forks: String,
  size: Number,
  created: Date,
  update: Date
});

module.exports = mongoose.model('Github', GithubSchema);

const GithubMore = new Schema({
  issues_url: String,
  deployments_url: String,
  stargazers_count: String,
  forks_url: String,
  mirror_url: String,
  subscription_url: String,
  notifications_url: String,
  collaborators_url: String,
  watchers: String,
  name: String,
  language: String,
  url: String,
  created_at: String,
  pushed_at: String,
  forks_count: String,
  default_branch: String,
  teams_url: String,
  trees_url: String,
  branches_url: String,
  subscribers_url: String,
  stargazers_url: String,
});
