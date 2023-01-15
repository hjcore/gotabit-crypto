export async function onRequest(context: any) {
  const { SOURCE, TARGET } = context.env;

  if (!SOURCE || !TARGET || context.request.headers.get('host') != SOURCE) {
    return new Response(
      JSON.stringify({
        code: 400,
        msg: 'Source not match or miss source, target.',
        date: Date.now(),
      }),
      { status: 400 }
    );
  }

  try {
    const url = context.request.url.replace(SOURCE, TARGET);
    const res = await fetch(url, context.request);
    context.waitUntil(res);

    return res;
  } catch {}

  return new Response(JSON.stringify({ code: 502, date: Date.now() }), {
    status: 502,
  });
}
