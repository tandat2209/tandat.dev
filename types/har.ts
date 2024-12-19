// Types for HAR (HTTP Archive) format
export interface Har {
  log: HarLog;
}

export interface HarLog {
  version: string;
  creator: HarCreator;
  pages?: HarPage[];
  entries: HarEntry[];
}

export interface HarCreator {
  name: string;
  version: string;
}

export interface HarPage {
  startedDateTime: string;
  id: string;
  title: string;
  pageTimings: HarPageTimings;
}

export interface HarPageTimings {
  onContentLoad?: number;
  onLoad?: number;
}

export interface HarEntry {
  _initiator?: HarInitiator;
  _priority: string;
  _resourceType: string;
  cache: Record<string, unknown>;
  connection?: string;
  pageref?: string;
  request: HarRequest;
  response: HarResponse;
  serverIPAddress?: string;
  startedDateTime: string;
  time: number;
  timings: HarTimings;
}

export interface HarInitiator {
  type: string;
  stack?: HarCallStack;
}

export interface HarCallStack {
  callFrames: HarCallFrame[];
  parent?: HarCallStack;
  description?: string;
}

export interface HarCallFrame {
  functionName: string;
  scriptId: string;
  url: string;
  lineNumber: number;
  columnNumber: number;
}

export interface HarRequest {
  method: string;
  url: string;
  httpVersion: string;
  headers: HarHeader[];
  queryString: HarQueryParam[];
  cookies: HarCookie[];
  headersSize: number;
  bodySize: number;
  postData?: HarPostData;
}

export interface HarResponse {
  status: number;
  statusText: string;
  httpVersion: string;
  headers: HarHeader[];
  cookies: HarCookie[];
  content: HarContent;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  _transferSize: number;
  _error: null | string;
  _fetchedViaServiceWorker: boolean;
}

export interface HarHeader {
  name: string;
  value: string;
}

export interface HarQueryParam {
  name: string;
  value: string;
}

export interface HarCookie {
  name?: string;
  value?: string;
  path?: string;
  domain?: string;
  expires?: string;
  httpOnly?: boolean;
  secure?: boolean;
}

export interface HarPostData {
  mimeType: string;
  text: string;
}

export interface HarContent {
  size: number;
  mimeType: string;
  text?: string;
}

export interface HarTimings {
  blocked: number;
  dns: number;
  ssl: number;
  connect: number;
  send: number;
  wait: number;
  receive: number;
  _blocked_queueing: number;
  _workerStart: number;
  _workerReady: number;
  _workerFetchStart: number;
  _workerRespondWithSettled: number;
}