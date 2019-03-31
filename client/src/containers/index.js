import React from 'react'
import Github from './Github'
import Msdn from './Msdn'
import Stackoverflow from './Stackoverflow'
import Youtube from './Youtube'
import EchartsTest from '../components/Echarts.demo'
import Repository1 from '../components/Repository1'

export const Repository = () => <h1><Repository1/></h1>
export const Commit = () => <h1>Commit</h1>
export const Topic = () => <h1>Topic</h1>
export const Views = () => <h1>Views</h1>
export const Hot = () => <h1>Hot</h1>
export const Latest = () => <h1>Latest</h1>
export const Tags = () => <h1>Tags</h1>
export const Channel9 = () => <h1>Channel9</h1>
export const Blogs = () => <h1>Blogs</h1>
export const Others = () => <h1>Others</h1>
export const About = () => <h1>About</h1>
export const Demo = () => <h1><EchartsTest/></h1>

export default {
  Github,
  Msdn,
  Stackoverflow,
  Youtube
}