

interface IJobListing {
  uuid: string;
  title: string;
  company_uuid: string;
  is_top: boolean;
  gpa: number;
  years_of_experience: number[];
  salary: {
    min: number;
    max: number;
  };
  gender: string;
  description: string;
  requirements: string;
  skills: string[];
  uri: string;
  posted_at: string;
  score: number;
  is_applied: boolean;
  applied_at: string | null;
  job_type: string[];
  degree: string[];
  industry: string[];
  major: string[];
  career_level: string[];
  languages: {[key: string]: number}[],
  location?: {country: string}
}
