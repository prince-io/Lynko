import PreviewWrapper from "@/components/PreviewWrapper";

export default async function Page({ params }) {
  const data = await params;
  const username = await data.username;
  return <PreviewWrapper username={username} />;
}

export async function generateMetadata({ params }) {
  const data = await params;
  const username = await data.username;

  return {
    title: `${username} | Lynko`,
    description: `Explore all of ${username}'s links, projects, and profiles — shared through one simple Lynko page.`,
  };
}
