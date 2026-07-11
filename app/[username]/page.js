import LynkoPageWrapper from "@/components/lynkopage/LynkoPageWrapper";

export default async function Page() {
  return <LynkoPageWrapper />;
}

export async function generateMetadata({ params }) {
  const data = await params;
  const username = await data.username;

  return {
    title: `${username} | Lynko`,
    description: `Explore all of ${username}'s links, projects, and profiles — shared through one simple Lynko page.`,
  };
}
