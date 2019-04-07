import {fetching} from '../utils';

const MOCK_API = {
  "industry": "/data/industry.json",
  "region": "/data/region.json",
  "languages": "/data/language.json",
  "sof": "/data/stackoverflow.json",
  "skills": "/data/skills.json"
}

export const getIndustry = () => {
  let url = process.env.NODE_ENV === 'production' ?
    '/api/industry' : MOCK_API['industry']
  return fetching(url);
}

export const getRegion = () => {
  let url = process.env.NODE_ENV === 'production' ?
    '/api/region' : MOCK_API['region']
  return fetching(url);
}

export const getLanguages = () => {
  let url = process.env.NODE_ENV === 'production' ?
    '/api/language' : MOCK_API['languages']
  return fetching(url);
}

export const getSof = () => {
  let url = process.env.NODE_ENV === 'production' ?
    '/api/sof' : MOCK_API['sof']
  return fetching(url);
}

const getSkills = () => {
  let url = process.env.NODE_ENV === 'production' ?
    '/api/skills' : MOCK_API['skills']
  return fetching(url);
}
