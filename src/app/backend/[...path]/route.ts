import { NextRequest } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

function buildTargetUrl(path: string[], search: string) {
  const normalizedBase = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.map(encodeURIComponent).join("/");
  return `${normalizedBase}/${normalizedPath}${search}`;
}

function buildForwardHeaders(request: NextRequest) {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  const authorization = request.headers.get("authorization");

  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);
  if (authorization) headers.set("authorization", authorization);

  return headers;
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const targetUrl = buildTargetUrl(path, request.nextUrl.search);
  const method = request.method;
  const hasBody = !["GET", "HEAD"].includes(method);

  const response = await fetch(targetUrl, {
    method,
    headers: buildForwardHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const contentType = response.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
