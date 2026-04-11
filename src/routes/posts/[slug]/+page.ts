export async function load({ params }) {
  const module = await import(`$content/${params.slug}/index.md`);

  return {
    PostContent: module.default,
    meta: module.meta,
  };
}
