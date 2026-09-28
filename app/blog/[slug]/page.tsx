type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  return (
    <main>
      <h1>Blog Detail</h1>
      <p>Slug: {slug}</p>
    </main>
  );
}
