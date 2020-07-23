export interface INewsApiResponse {
  hits: IHits[];
  page: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
}

export interface IHits {
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: number;
  objectID: string;
  created_at: Date;
  created_at_i: number;
  parent_id: number;
  relevancy_score: number;
  story_id: number;
  story_title: string;
  story_url: string;
  _highlightResult: IHighlightResult;
  _tags: string[];
  hide?: boolean;
}

export interface IHighlightResult {
  title: ITitle;
  url: ITitle;
  author: ITitle;
}
export interface ITitle {
  value: string;
  matchLevel: string;
  matchedWords: string[];
}

export const getMockNews: any = () =>
  JSON.parse(
    '{"hits":[{"created_at":"2012-04-02T08:23:08.000Z","title":null,"url":null,"author":"michaelkscott","points":3042,"story_text":"10+ years","comment_text":null,"num_comments":null,"story_id":null,"story_title":null,"story_url":null,"parent_id":3786926,"created_at_i":1333354988,"relevancy_score":3845,"_tags":["pollopt","author_michaelkscott","story_3786932"],"objectID":"3786932","_highlightResult":{"author":{"value":"michaelkscott","matchLevel":"none","matchedWords":[]},"story_text":{"value":"10+ years","matchLevel":"none","matchedWords":[]}}}],"nbHits":22174649,"page":0,"nbPages":50,"hitsPerPage":20,"exhaustiveNbHits":true,"query":"","params":"advancedSyntax=true&analytics=true&analyticsTags=backend&page=0","processingTimeMS":1}'
  );
